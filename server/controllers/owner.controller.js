const Message = require("../utils/message.util");
const db = require("../db");

class OwnerController {
    async add(req, res) {
        try {
            const { name, filts, avatar } = req.body;
            const queryForFind = `SELECT * FROM owner WHERE name = $1`;
            const findOwner = await db.query(queryForFind, [name]);
            const owner = findOwner.rows[0];

            if (owner) {
                return new Message(400, { success: false }).log(res, `Исполнитель по имени ${name} уже существует`);
            }

            let fls = filts;

            if (typeof fls === "string") {
                fls = JSON.parse(filts);
            }

            const queryForInsert = `INSERT INTO owner(name,filts,avatar) VALUES($1,$2,$3)`;
            const newOwner = await db.query(queryForInsert, [name, fls, avatar]);

            return new Message(200, { success: true, owner: newOwner.rows[0] }).log(res, `Исполнитель добавлен`);
        } catch (e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    getOne(req, res) {
        const { id } = req.params;
        const queryForFind = `SELECT * FROM owner WHERE id = $1`;

        db.query(queryForFind, [id])
            .then(findOwner => {
                const currentFindOwner = findOwner.rows;

                if (!currentFindOwner) new Message(400, { success: false })
                    .log(res, `Поля rows в findOwner не существует`);

                const owner = currentFindOwner[0];
                const audios = [];
                const oldPlaylists = [];
                const newPlaylists = [];

                let count = 0;

                // audios
                for (let i = 0; i < owner.audios.length; i++) {
                    const audioId = owner.audios[i];
                    const queryForFindTrack = `SELECT * FROM track WHERE id = $1`;

                    db.query(queryForFindTrack, [audioId])
                        .then(findTrack => {
                            const currentFindTrack = findTrack.rows;

                            if (currentFindTrack) audios.push(currentFindTrack[0]);
                            else new Message(400, { success: false })
                                .log(res, `Поля rows в findTrack не существует`);
                        })
                        .catch(err => new Message(400, { success: false })
                            .log(res, `Ошибка при поиске трека: ${err.message}`));
                }

                // old playlists
                for (let s = 0; s < owner.audios.length; s++) {
                    const audioId = owner.audios[s];
                    const queryForFindPlaylist = `SELECT * FROM playlist WHERE $1 = ANY (audios)`;

                    db.query(queryForFindPlaylist, [audioId])
                        .then(findPlaylist => {
                            const currentFindPlaylist = findPlaylist.rows;

                            if (currentFindPlaylist) {
                                if (count > newPlaylists.length) return;
                                count++;
                                oldPlaylists.push(currentFindPlaylist[0]);
                            } else new Message(400, { success: false })
                                .log(res, `Поля rows в findPlaylist не существует`);
                        })
                        .catch(err => new Message(400, { success: false })
                            .log(res, `Ошибка при поиске плейлиста: ${err.message}`));
                }

                // new playlists
                for (let c = 0; c < oldPlaylists.length; c++) {
                    const playlist = oldPlaylists[c];
                    const audiosForCurrentPlaylist = [];

                    for (let j = 0; j < playlist.audios.length; j++) {
                        const audioId = playlist.audios[j];
                        const queryForFindTrack = `SELECT * FROM track WHERE id = $1`;

                        db.query(queryForFindTrack, [audioId])
                            .then(findTrack => {
                                const currentFindTrack = findTrack.rows;

                                if (currentFindTrack) audiosForCurrentPlaylist.push(currentFindTrack[0]);
                                else new Message(400, { success: false })
                                    .log(res, `Поля rows в findTrack не существует`);
                            })
                            .catch(err => new Message(400, { success: false })
                                .log(res, `Ошибка при поиске трека: ${err.message}`));
                    }

                    newPlaylists.push({ ...playlist, audios: audiosForCurrentPlaylist });
                }

                return new Message(200, { success: true, audios, playlists: newPlaylists, owner: owner }).log(res);
            })
            .catch(err => {
                return new Message(400, { success: false }).log(res, `Ошибка при поиске пользователя: ${err.message}`);
            });
    };

    async getTracksByTrack(req, res) {
        try {
            const { id } = req.params;
            const queryForFind = `SELECT owners FROM track WHERE id = $1`;
            const findTrack = await db.query(queryForFind, [id]);
            const owners = [];

            for (let i = 0; i < findTrack.rows[0].owners.length; i++) {
                const ownerId = findTrack.rows[0].owners[i];
                const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
                const findOwner = await db.query(queryForFindOwner, [ownerId]);
                owners.push(findOwner.rows[0]);
            }

            return new Message(200, { success: true, owners }).log(res);
        } catch (e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };
}

module.exports = new OwnerController();