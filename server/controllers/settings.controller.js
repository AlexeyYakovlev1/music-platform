const Message = require("../utils/message.util");
const db = require("../db");
const { hashSync, compareSync } = require("bcrypt");

class SettingsController {
    userChange(req, res) {
        const queryForFindUser = `SELECT * FROM person WHERE id = $1`;

        db.query(queryForFindUser, [req.user.id || -1])
            .then(findUser => {
                if (findUser.rows) {
                    const user = findUser.rows[0];

                    if (!user) new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${req.user.id} не существует`);

                    const { body } = req;

                    if (!body) new Message(400, { success: false }).log(res, `Поле body должено быть передано`);

                    const { name, email, old_password, new_password } = body;

                    let hashPassword = user.password;

                    if (old_password) {
                        hashPassword = hashSync(new_password, 5);

                        const comparePassword = compareSync(old_password, user.password);

                        if (!comparePassword) new Message(400, { success: false }).log(res, `Старые пароли не совпадают`);
                    }

                    const queryForUpdate = `UPDATE person SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`;

                    db.query(queryForUpdate, [name, email, hashPassword, user.id])
                        .then(updateUser => {
                            const currentUpdateUser = updateUser.rows;

                            if (currentUpdateUser) {
                                if (!currentUpdateUser[0]) new Message(400, { success: false }).log(res, `Такого пользователя не существует`);

                                return new Message(200, { success: true, user: currentUpdateUser[0] }).log(res, `Данные сохранены`);
                            } else {
                                return new Message(400, { success: false }).log(res, `Поля rows в findUser не существует`);
                            }
                        })
                        .catch(err => {
                            return new Message(400, { success: false }).log(res, `Ошибка при обновлении пользователя: ${err.message}`);
                        });
                } else {
                    return new Message(400, { success: false }).log(res, `Поля rows в findUser не существует`);
                }
            })
            .catch(err => {
                return new Message(400, { success: false }).log(res, `Ошибка при поиске пользователя: ${err.message}`);
            });
    };

    userAvatar(req, res) {
        const queryForFindUser = `SELECT * FROM person WHERE id = $1`;

        db.query(queryForFindUser, [req.user.id])
            .then(findUser => {
                const currentUser = findUser.rows;

                if (currentUser) {
                    const user = currentUser[0];

                    if (!user) new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${req.user.id} не существует`);

                    const { body } = req;

                    if (!body) new Message(400, { success: false }).log(res, `Поле body должено быть передано`);

                    const { avatar } = body;
                    const queryForUpdateUser = `UPDATE person SET avatar = $1 WHERE id = $2`;

                    db.query(queryForUpdateUser, [avatar, req.user.id])
                        .then(_ => new Message(200, { success: true }).log(res, `Данные сохранены`))
                        .catch(err => {
                            return new Message(400, { success: false }).log(res, `Ошибка при обновлении пользователя: ${err.message}`);
                        })
                } else {
                    return new Message(400, { success: false }).log(res, `Поля rows в findUser не существует`);
                }
            })
            .catch(err => {
                return new Message(400, { success: false }).log(res, `Ошибка при поиске пользователя: ${err.message}`);
            });
    }
}

module.exports = new SettingsController();