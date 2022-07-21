const db = require("../db");
const Message = require("../utils/message.util");

class FiltsController {
    async add(req, res) {
        const { name } = req.body;

        if (!name)
            return new Message(400, { success: false }).log(res, `Поле name должно быть передано через req.body`);

        const queryForFind = `SELECT * FROM filt WHERE name = $1`;

        db.query(queryForFind, [name])
            .then(findFilt => {
                if (!findFilt.rows)
                    return new Message(400, { success: false }).log(res, `Поля rows findFilt не существует`);

                if (findFilt.rows[0])
                    return new Message(400, { success: false }).log(res, `Ключевое слово ${name} уже существует`);

                const queryForInsert = `INSERT INTO filt(name) VALUES($1)`;

                db.query(queryForInsert, [name])
                    .then(newFilt => {
                        if (!newFilt.rows)
                            return new Message(400, { success: false }).log(res, `Поля rows newFilt не существует`);

                        return new Message(200, { success: true, filt: newFilt.rows[0] })
                            .log(res, `Ключевое слово добавлено`);
                    })
                    .catch(err => {
                        return new Message(400, { success: false }).log(res, `Ошибка при создании newFilt: ${err.message}`);
                    });
            })
            .catch(err => {
                return new Message(400, { success: false }).log(res, `Ошибка при нахождении findFilt: ${err.message}`);
            });
    };

    getAll(req, res) {
        const queryForFind = `SELECT * FROM filt`;

        db.query(queryForFind)
            .then(filts => {
                if (!filts.rows)
                    return new Message(400, { success: false }).log(res, `Поля rows в filts не существует`);

                return new Message(200, { success: true, filts: filts.rows }).log(res);
            })
            .catch(err => {
                return new Message(400, { success: false }).log(res, `Ошибка при нахождении filts: ${err.message}`);
            });
    };
}

module.exports = new FiltsController();