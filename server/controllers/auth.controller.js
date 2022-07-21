const db = require("../db");
const Message = require("../utils/message.util");

const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_KEY } = process.env;

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password)
                return new Message(400, { success: false })
                    .log(res, `Убедитесь, что поля name, email, password были переданы через req.body`);

            const queryForFind = `SELECT * FROM person WHERE email = $1`;
            const findUser = await db.query(queryForFind, [email]);

            if (!findUser.rows)
                return new Message(400, { success: false }).log(res, `Поля rows в findUser не существует`);

            if (findUser.rows[0])
                return new Message(400, { success: false }).log(res, `Такой пользователь уже существует`);

            const hashPassword = bcrypt.hashSync(password, 5);
            const queryForCreatePerson = `INSERT INTO person(name, email, password) VALUES($1,$2,$3) RETURNING *`;
            const queryForCreateFollow = `INSERT INTO follow(person_id) VALUES($1)`;

            const newPerson = await db.query(queryForCreatePerson, [name, email, hashPassword]);
            await db.query(queryForCreateFollow, [newPerson.rows[0].id]);

            return new Message(201, { success: true });
        } catch (e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) new Message(400, { success: false })
                .log(res, `Убедитесь, что поля email, password были переданы через req.body`);

            const queryForFind = `SELECT * FROM person WHERE email = $1`;
            const findUser = await db.query(queryForFind, [email]);
            const user = findUser.rows[0];

            if (!user) new Message(400, { success: false })
                .log(res, `Такого пользователя не существует`);

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) new Message(400, { success: false }).log(res, `Данные неверны`);

            const payload = user;

            delete payload["exp"];
            delete payload["iat"];

            const token = sign(user, JWT_KEY, { expiresIn: "24h" });

            return new Message(200, { success: true, token, user }).log(res, `Выполнен вход`);
        } catch (e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    check(req, res) {
        const queryForFindUser = `SELECT * FROM person WHERE id = $1`;

        db.query(queryForFindUser, [req.user.id])
            .then(findUser => {
                if (!findUser.rows)
                    return new Message(400, { success: false }).log(res, `Поля rows в findUser не существует`);

                const payload = findUser.rows[0];

                delete payload["exp"];
                delete payload["iat"];

                const token = sign(payload, JWT_KEY, { expiresIn: "24h" });

                return new Message(200, { success: true, token, user: payload }).log(res);
            });
    }
}

module.exports = new AuthController();