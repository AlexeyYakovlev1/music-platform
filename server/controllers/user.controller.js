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

            const payload = {...user};
            
            delete payload["exp"];
            delete payload["iat"];

            return new Message(200, { success: true, user: payload }).log(res);
        } catch(e) {
            return new Message();
        }
    };
}

module.exports = new UserController();