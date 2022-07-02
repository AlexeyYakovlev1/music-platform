const Message = require("../services/message.service");
const db = require("../db");

class FollowController {
    async getByUser(req, res) {
        try {
            const { id } = req.params;
            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [id]);

            if (!findPerson.rows[0]) {
                return new Message(400, { success: false }).log(res, `Пользователь по идентификатору ${id} не существует`);
            }

            const queryForSearchFollow = `SELECT * FROM follow WHERE person_id = $1`;
            const findFollow = await db.query(queryForSearchFollow, [id]);
            const follow = findFollow.rows[0];

            const tracks = [];
            const playlists = [];

            async function pushData(from, tableName, to) {
                for (let i = 0; i < from.length; i++) {
                    const id = from[i];
                    const queryForFind = `SELECT * FROM ${tableName} WHERE id = $1`;
                    const find = await db.query(queryForFind, [id]);

                    if (!find.rows[0]) {
                        return new Message(400, { success: false }).log(res, `${tableName} по идентификатору ${trackId} не существует`);
                    }

                    to.push({ ...find.rows[0], follow: true });
                }    
            }

            await pushData(follow.tracks || [], "track", tracks);
            await pushData(follow.playlists || [], "playlist", playlists);

            const payload = {...follow, tracks, playlists};

            return new Message(200, { success: true, follow: payload }).log(res);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    }
}

module.exports = new FollowController();