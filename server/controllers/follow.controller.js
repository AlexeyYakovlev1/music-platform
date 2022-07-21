const Message = require("../utils/message.util");
const pushData = require("../utils/pushData.util");
const db = require("../db");

class FollowController {
    async getByUser(req, res) {
        try {
            const { id } = req.params;

            if (!id)
                return new Message(400, { success: false }).log(res, `id должен быть передан через req.params`);

            const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;
            const findPerson = await db.query(queryForFindPerson, [id]);

            if (!findPerson.rows)
                return new Message(400, { success: false }).log(res, `Поля rows в findPerson не существует`);

            if (!findPerson.rows[0])
                return new Message(400, { success: false }).log(res, `Пользователь по идентификатору ${id} не существует`);

            const queryForSearchFollow = `SELECT * FROM follow WHERE person_id = $1`;
            const findFollow = await db.query(queryForSearchFollow, [id]);
            const follow = findFollow.rows[0];

            const tracks = [];
            const playlists = [];

            await pushData(follow.tracks || [], "track", tracks);
            await pushData(follow.playlists || [], "playlist", playlists);

            const payload = { ...follow, tracks, playlists };

            return new Message(200, { success: true, follow: payload }).log(res);
        } catch (e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    }
}

module.exports = new FollowController();