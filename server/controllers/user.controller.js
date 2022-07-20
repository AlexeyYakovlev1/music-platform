const Message = require("../utils/message.util");
const db = require("../db");

class UserController {
    getOne(req, res) {
        const { id } = req.params;
        const queryForFindPerson = `SELECT * FROM person WHERE id = $1`;

        db.query(queryForFindPerson, [id])
            .then(findPerson => {
                if (findPerson.rows) {
                    const user = findPerson.rows[0];

                    if (!user) new Message(400, { success: false }).log(res, `Такого пользователя не существует`);

                    const payload = { ...user };

                    delete payload["exp"];
                    delete payload["iat"];

                    return new Message(200, { success: true, user: { ...payload } }).log(res);
                } else {
                    return new Message(400, { success: false }).log(res, `Поля rows в findPerson не существует`);
                }
            })
            .catch(err => {
                return new Message(400, { success: false }).log(res, `Ошибка при поиске пользователя: ${err.message}`);
            });
    }
}

module.exports = new UserController();