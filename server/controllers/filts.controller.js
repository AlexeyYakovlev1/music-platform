const db = require("../db");
const Message = require("../services/message.service");

class FiltsController {
    async add(req, res) {
        try {
            const { name } = req.body;
            const queryForFind = `SELECT * FROM filt WHERE name = $1`;
            const findFilt = await db.query(queryForFind, [name]);

            if (findFilt.rows[0]) {
                return new Message(400, { success: false }).log(res, `Ключевое слово ${name} уже существует`);
            }

            const queryForInsert = `INSERT INTO filt(name) VALUES($1)`;
            const newFilt = await db.query(queryForInsert, [name]);

            return new Message(200, { success: true, filt: newFilt.rows[0] }).log(res, `Ключевое слово добавлено`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };
}

module.exports = new FiltsController();