const Message = require("../services/message.service");
const db = require("../db");
const { hashSync, compareSync } = require("bcrypt");

class SettingsController {
    async userChange(req, res) {
        try {
            const queryForFindUser = `SELECT * FROM person WHERE id = $1`;
            const findUser = await db.query(queryForFindUser, [req.user.id]);
            const user = findUser.rows[0];

            if (!user) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${req.user.id} не существует`);
            }

            const { name, email, old_password, new_password } = req.body;

            let hashPassword = user.password;

            if (old_password) {
                hashPassword = hashSync(new_password, 5);
                
                const comparePassword = compareSync(old_password, user.password);

                if (!comparePassword) {
                    return new Message(400, { success: false }).log(res, `Старые пароли не совпадают`);
                }
            }
            
            const queryForUpdate = `UPDATE person SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`;
            const updateUser = await db.query(queryForUpdate, [name, email, hashPassword, user.id]);
        
            return new Message(200, { success: true, user: updateUser }).log(res, `Данные сохранены`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async userAvatar(req, res) {
        try {
            const queryForFindUser = `SELECT * FROM person WHERE id = $1`;
            const findUser = await db.query(queryForFindUser, [req.user.id]);
            const user = findUser.rows[0];

            if (!user) {
                return new Message(400, { success: false }).log(res, `Пользователя по идентификатору ${req.user.id} не существует`);
            }

            const { avatar } = req.body;
            const queryForUpdateUser = `UPDATE person SET avatar = $1 WHERE id = $2`;
            await db.query(queryForUpdateUser, [avatar, req.user.id]);

            return new Message(200, { success: true }).log(res, `Данные сохранены`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    }
}

module.exports = new SettingsController();