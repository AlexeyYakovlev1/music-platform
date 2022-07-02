const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const { getAudioDurationInSeconds } = require('get-audio-duration');

const db = require("../db");
const Message = require("../services/message.service");

const { PROJECT_ROOT } = process.env;

class AudioController {
	// add track
	async trackAdd(req, res) {
		try {
			const { filt, owners, cover, title } = req.body;
			const musicDir = path.relative(PROJECT_ROOT, "./templates/music");
			const file = req.files.file;
			const musicName = file.name;
			const musicExtname = path.extname(musicName);
			const allowedTypes = [".mp3", ".wav", ".ogg"];

			// check extension
			if (!allowedTypes.includes(musicExtname)) {
				return new Message(400, { success: false }).log(res, `Поддерживаемые расширения для файлов: { ${allowedTypes.join(", ")} }`);
			};

			// check dir for music
			if (!fs.existsSync(musicDir)) {
				fs.mkdirSync(musicDir, { recursive: true });
			};

			const queryForFind = `SELECT title FROM track WHERE title = $1`;
			const findTrack = await db.query(queryForFind, [title]);

			if (findTrack.rows[0]) {
				return new Message(400, { success: false }).log(res, `Трек по заголовку ${title} уже существует`);
			}

			const fileName = `${musicName.replace(musicExtname, "")}_${uuid.v4()}${musicExtname}`;
			const queryForAdd = `INSERT INTO track(duration,filt,owners,cover,title,audio) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;

			let ows = owners;

			// for form-data in postman
			if (typeof owners === "string") {
				ows = JSON.parse(owners);
			}

			// insert file in folder
			fs.appendFile(path.join(musicDir, fileName), file.data, (err) => {
				if (err) {
					return new Message(400, { success: false }).log(res, `Ошибка при добавлении файла в папку: ${err.message}`);
				}
			});

            function getTime(time) {
                let res = "0:00";
                let minutes, seconds = 0;

                seconds = Math.floor(time % 60);
                minutes = Math.floor((time / 60) % 60);

                res = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

                return res;
            };

            const duration = await getAudioDurationInSeconds(path.join(musicDir, fileName)).then(data => getTime(data));
			const newTrack = await db.query(queryForAdd, [duration, filt, ows, cover, title, fileName]);

			// update or no owner audios
			for (let i = 0; i < ows.length; i++) {
				const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
				const findOwner = await db.query(queryForFindOwner, [ows[i]]);
				const owner = findOwner.rows[0];

				if (!owner) {
					await db.query(`DELETE FROM track WHERE id = $1`, [newTrack.rows[0].id]);
					return new Message(400, { success: false }).log(res, `Исполнитель по идентификатору ${ows[i]} не существует`);
				}

				if (!owner.filts.some(txt => filt === txt)) {
					await db.query(`DELETE FROM track WHERE id = $1`, [newTrack.rows[0].id]);
					return new Message(400, { success: false }).log(res, `У исполнителя ${owner.name} нет ключевых слов под слово ${filt}`);
				}

				let audios = [newTrack.rows[0].id];

                if (owner.audios) audios = audios.concat(owner.audios);

				const queryForUpdateOwner = `UPDATE owner SET audios = $1 WHERE id = $2`;
					
				await db.query(queryForUpdateOwner, [audios, ows[i]]);
			}

			return new Message(200, { success: true, findTrack: newTrack.rows[0] }).log(res, `Музыка добавлена`);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
	};

	// remove track
	async trackRemove(req, res) {
		try {
			const { id } = req.params;
			
			// find track by id
			const queryForFind = `SELECT * FROM track WHERE id = $1`;
			const findTrack = await db.query(queryForFind, [id]);
			const track = findTrack.rows[0];

			if (!track) {
				return new Message(400, { success: false }).log(res, "Трека по такому идентификатору не существует");
			};

			// update owner
			const queryForFindOwner = `SELECT * FROM owner WHERE $1 = ANY (filts)`;
			const findOwner = await db.query(queryForFindOwner, [track.filt]);
			const owner = findOwner.rows[0];

			const newAudiosForOwner = owner.audios.filter(audioId => {
				return audioId !== track.id;
			});

			const queryForUpdateOwner = `UPDATE owner SET audios = $1 WHERE id = $2`;
			await db.query(queryForUpdateOwner, [newAudiosForOwner, owner.id]);

			// delete track by id
			const queryForRemove = `DELETE FROM track WHERE id = $1`;
			await db.query(queryForRemove, [id]);

			const trackAudio = track.audio;
			const audioDir = path.relative(PROJECT_ROOT, `./templates/music/${trackAudio}`);

			// check exists for audio dir
			if (fs.existsSync(audioDir)) {
				fs.unlink(audioDir, (err) => {
					if (err) {
						return new Message(400, { success: false }).log(res, `Ошибка при удалении файла: ${err.message}`);
					}
				});
			};

			return new Message(200, { success: true }).log(res, "Трек был удален");
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);	
		}
	};

    // follow track
    async followTrack(req, res) {
        try {
            const { params, user, query } = req;
            const { id } = params;
            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [user.id]);

            if (!findPerson.rows[0]) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${user.id} не существует`);
            }

            const queryForFindTrack = `SELECT * FROM track WHERE id = $1`;
            const findTrack = await db.query(queryForFindTrack, [id]);
            const track = findTrack.rows[0];
            
            if (!track) {
                return new Message(400, { success: false }).log(res, `Трека по идентификатору ${id} не существует`);
            }

            if (query.follow === "true") {   
                const queryForUpdateAppFollow = `UPDATE follow SET tracks = array_append(tracks, $1) WHERE person_id = $2`;
                await db.query(queryForUpdateAppFollow, [+id, user.id]);
            } else if (query.follow === "false") {
                const queryForUpdateRemFollow = `UPDATE follow SET tracks = array_remove(tracks, $1) WHERE person_id = $2`;
                await db.query(queryForUpdateRemFollow, [+id, user.id]);
            }

            return new Message(200, { success: true }).log(res);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

	// get all tracks
	async trackGetAll(req, res) {
		try {
			const queryForFind = `SELECT * FROM track`;
			const findTracks = await db.query(queryForFind);

			return new Message(200, { success: true, tracks: findTracks.rows }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
	};

	// get track by id
	async trackGetOne(req, res) {
		try {
			const { id } = req.params;
			const queryForFind = `SELECT * FROM track WHERE id = $1`;
			const findTrack = await db.query(queryForFind, [id]);

			return new Message(200, { success: true, track: findTrack.rows[0] }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
	};

	// add playlist
	async playlistAdd(req, res) {
		try {
			const { title, cover, owners, name } = req.body;
			const queryForFind = `SELECT * FROM playlist WHERE title = $1`;
			const findPlaylist = await db.query(queryForFind, [title]);
			const playlist = findPlaylist.rows[0];

			if (playlist) {
				return new Message(400, { success: false }).log(res, `Плейлист по такому названию уже существует`);
			}

			// check owners
			owners.forEach(async (owner) => {
				const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
				const findOwner = await db.query(queryForFindOwner, [owner]);
				if (!findOwner.rows[0]) {
					return new Message(400, { success: false }).log(res, `Исполнитель по идентификатору ${owner} не найден`);
				}
			});

			// search audio by property filt
			const queryForFindTracks = `SELECT id FROM track WHERE filt = $1`;
			const findTracksByFilt = await db.query(queryForFindTracks, [name]);

			if (!findTracksByFilt.rows.length) {
				return new Message(400, { success: false }).log(res, `Песен по фильтру ${name} не найдено`);
			}

			// create playlist
			const audioIds = findTracksByFilt.rows.map(track => track.id);
			const queryForCreatePlaylist = `INSERT INTO playlist(title,cover,owners,name,audios) VALUES($1,$2,$3,$4,$5) RETURNING *`;
			const newPlaylist = await db.query(queryForCreatePlaylist, [title,cover,owners,name,audioIds]);

			// add tracks to property audios in table owner
			for (let i = 0; i < owners.length; i++) {
				const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
				const findOwner = await db.query(queryForFindOwner, [owners[i]]);
				const owner = findOwner.rows[0];

				if (owner.filts.some(item => item === name)) {
					const queryForUpdate = `UPDATE owner SET audios = $1, playlists = array_prepend($2, playlists) WHERE filts = $3`;
					await db.query(queryForUpdate, [audioIds, newPlaylist.rows[0].id, owner.filts]);
				} else {
					return new Message(400, { success: false }).log(res, `У исполнителя '${owner.name}' фильтра под имя плейлиста '${name}'`);
				};
			};

			return new Message(200, { success: true, newPlaylist: newPlaylist.rows[0] }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);	
		}
	};

    // follow playlist
    async followPlaylist(req, res) {
        try {
            const { params, user, query } = req;
            const { id } = params;
            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [user.id]);

            if (!findPerson.rows[0]) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${user.id} не существует`);
            }

            const queryForFindPlaylist = `SELECT * FROM playlist WHERE id = $1`;
            const findPlaylist = await db.query(queryForFindPlaylist, [id]);
            const playlist = findPlaylist.rows[0];

            if (!playlist) {
                return new Message(400, { success: false }).log(res, `Плейлиста по идентификатору ${id} не существует`);
            }

            const queryForUpdatePlaylist = `UPDATE playlist SET follow = $1 WHERE id = $2`;
            await db.query(queryForUpdatePlaylist, [query.follow, id]);

            return new Message(200, { success: true }).log(res);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

	// remove playlist by id
	async playlistRemove(req, res) {
		try {
			// find playlist
			const { id } = req.params;
			const queryForFindPlaylist = `SELECT * FROM playlist WHERE id = $1`;
            const queryForFindOwners = `SELECT * FROM owner WHERE $1 = ANY (playlists)`;

			const findPlaylist = await db.query(queryForFindPlaylist, [id]);
			const findOwners = await db.query(queryForFindOwners, [id]);
            
            const playlist = findPlaylist.rows[0];
            const owners = findOwners.rows[0];

			if (!playlist) {
				return new Message(400, { success: false }).log(res, `Плейлист по идентификатору ${id} не существует`);
			}

            for (let i = 0; i < owners.length; i++) {
                const queryForUpdateOwner = `UPDATE owner SET playlists = array_remove(playlists, $1) WHERE id = $2`;
                await db.query(queryForUpdateOwner, [id, owners[i].id]);
            }

			// remove playlist
			const queryForDeletePlaylist = `DELETE FROM playlist WHERE id = $1`;
			await db.query(queryForDeletePlaylist, [id]);

			return new Message(200, { success: true }).log(res, `Плейлист удален`);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);	
		};
	};

	// get all playlists
	async playlistGetAll(req, res) {
		try {
			const queryForFind = `SELECT * FROM playlist`;
			const findPlaylists = await db.query(queryForFind);

			return new Message(200, { success: true, playlists: findPlaylists.rows }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
	};

	// get playlist by id
	async playlistGetOne(req, res) {
		try {
			const { id } = req.params;
			const queryForFind = `SELECT * FROM playlist WHERE id = $1`;
			const findPlaylist = await db.query(queryForFind, [id]);

			return new Message(200, { success: true, playlist: findPlaylist.rows[0] }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
	};

    // get all by id playlist
    async infoGetByPlaylist(req, res) {
		try {
            const { id } = req.params;
			const queryForFind = `SELECT * FROM playlist WHERE id = $1`;
			const findTracks = await db.query(queryForFind, [id]);
            const playlist = findTracks.rows[0];
            const audios = [];
            const owners = [];

            for (let i = 0; i < playlist.audios.length; i++) {
                const audioId = playlist.audios[i];
                const queryForFindAudio = `SELECT * FROM track WHERE id = $1`;
                const findTrack = await db.query(queryForFindAudio, [audioId]);
                audios.push(findTrack.rows[0]);
            }

            for (let i = 0; i < playlist.owners.length; i++) {
                const ownerId = playlist.owners[i];
                const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
                const findOwner = await db.query(queryForFindOwner, [ownerId]);
                owners.push(findOwner.rows[0]);
            }

			return new Message(200, { success: true, audios, owners, playlist }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
	};

    // get file by name
    async getFileByName(req, res) {
        try {
            const { name } = req.params;
            const musicDir = path.relative(PROJECT_ROOT, "./templates/music");
            const filePath = path.join(musicDir, name);

            if (!fs.existsSync(filePath)) {
                return new Message(400, { success: false })
                    .log(res, `Директории "./templates/music" для музыки не существует`);
            }

            const musicExtname = path.extname(name);
            const file = fs.readFileSync(filePath).toString("base64");
            const src = `data:audio/${musicExtname.replace(".", "")};base64,${file}`;

            return new Message(200, { success: true, src }).log(res);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    }
}

module.exports = new AudioController();