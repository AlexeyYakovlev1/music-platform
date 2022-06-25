const Message = require("../services/message.service");
const db = require("../db");

class UserController {
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const queryForFind = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFind, [id]);
            const user = findPerson.rows[0];

            if (!user) {
                return new Message(400, { success: false }).log(res, `Такого пользователя не существует`);
            }

            const tracks = [];
            const playlists = [];
            const owners = [];

            async function pushData(data, tableName, to) {
                for (let i = 0; i < data.length; i++) {
                    const id = data[i];
                    const queryForFind = `SELECT * FROM ${tableName} WHERE id = $1`;
                    const findTable = await db.query(queryForFind, [id]);
                    const table = findTable.rows[0];

                    if (table) to.push(table);
                }
            }

            await pushData(user.owners, "owner", owners);
            await pushData(user.playlists, "playlist", playlists);
            await pushData(user.tracks, "track", tracks);

            const payload = {...user, owners, tracks, playlists};
            
            delete payload["exp"];
            delete payload["iat"];

            return new Message(200, { success: true, user: payload }).log(res);
        } catch(e) {
            return new Message();
        }
    };

    async addTracks(req, res) {
        try {
            const { body, user } = req;

            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [user.id]);
            const person = findPerson.rows[0];
            
            if (!person) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${user.id} не существует`);
            }

            const { tracks } = body;

            for (let i = 0; i < tracks.length; i++) {
                const trackId = tracks[i];
                const queryForFindTrack = `SELECT * FROM track WHERE id = $1`;
                const findTrack = await db.query(queryForFindTrack, [trackId]);
                const track = findTrack.rows[0];

                if (!track) {
                    return new Message(400, { success: false }).log(res, `Трек по идентификатору ${trackId} не существует`);
                };
                
                const queryForUpdatePerson = `UPDATE person SET tracks = array_prepend($1, tracks) WHERE id = $2`;
                await db.query(queryForUpdatePerson, [trackId, user.id]);
            }

            return new Message(200, { success: true }).log(res, `Треки обновлены`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async addPlaylists(req, res) {
        try {
            const { body, user } = req;

            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [user.id]);
            const person = findPerson.rows[0];
            
            if (!person) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${user.id} не существует`);
            }

            const { playlists } = body;

            for (let i = 0; i < playlists.length; i++) {
                const playlistId = playlists[i];
                const queryForFindPlaylist = `SELECT * FROM playlist WHERE id = $1`;
                const findPlaylist = await db.query(queryForFindPlaylist, [playlistId]);
                const playlist = findPlaylist.rows[0];

                if (!playlist) {
                    return new Message(400, { success: false }).log(res, `Плейлист по идентификатору ${playlistId} не существует`);
                };
                
                const queryForUpdatePerson = `UPDATE person SET playlists = array_prepend($1, playlists) WHERE id = $2`;
                await db.query(queryForUpdatePerson, [playlistId, user.id]);
            }

            return new Message(200, { success: true }).log(res, `Плейлисты обновлены`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async addOwners(req, res) {
        try {
            const { body, user } = req;

            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [user.id]);
            const person = findPerson.rows[0];
            
            if (!person) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${user.id} не существует`);
            }

            const { owners } = body;

            for (let i = 0; i < owners.length; i++) {
                const ownerId = owners[i];
                const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
                const findOwner = await db.query(queryForFindOwner, [ownerId]);
                const owner = findOwner.rows[0];

                if (!owner) {
                    return new Message(400, { success: false }).log(res, `Исполнитель по идентификатору ${ownerId} не существует`);
                };
                
                const queryForUpdatePerson = `UPDATE person SET owners = array_prepend($1, owners) WHERE id = $2`;
                await db.query(queryForUpdatePerson, [ownerId, user.id]);
            }

            return new Message(200, { success: true }).log(res, `Исполнители обновлены`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };
}

module.exports = new UserController();