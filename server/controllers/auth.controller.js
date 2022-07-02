const db = require("../db");
const bcrypt = require("bcrypt");
const Message = require("../services/message.service");
const { sign } = require("jsonwebtoken");

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const queryForFind = `SELECT * FROM person WHERE email = $1`;
            const findUser = await db.query(queryForFind, [email]);
            
            if (findUser.rows[0]) {
                return new Message(400, { success: false }).log(res, `Такой пользователь уже существует`);
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const queryForCreatePerson = `INSERT INTO person(name, email, password) VALUES($1,$2,$3) RETURNING *`;
            const queryForCreateFollow = `INSERT INTO follow(person_id) VALUES($1)`;

            const newPerson = await db.query(queryForCreatePerson, [name, email, hashPassword]);
            await db.query(queryForCreateFollow, [newPerson.rows[0].id]);
            
            res.status(201).json({ success: true });
        } catch(e) {
            new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const queryForFind = `SELECT * FROM person WHERE email = $1`;
            const findUser = await db.query(queryForFind, [email]);
            const user = findUser.rows[0];
            
            if (!user) {
                return new Message(400, { success: false }).log(res, `Такого пользователя не существует`);
            }
            
            const comparePassword = bcrypt.compareSync(password, user.password);
            
            if (!comparePassword) {
                return new Message(400, { success: false }).log(res, `Данные неверны`);
            }

            const payload = user;

            delete payload["exp"];
            delete payload["iat"];
            
            const token = sign(user, process.env.JWT_KEY, { expiresIn: "24h" });
            
            new Message(200, { success: true, token, user }).log(res, `Выполнен вход`);
        } catch(e) {
            new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async check(req, res) {
        try {
            const user = req.user;
            const payload = user;

            delete payload["exp"];
            delete payload["iat"];
            
            const token = sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
            
            new Message(200, { success: true, token, user }).log(res);
        } catch(e) {
            new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    }
}

module.exports = new AuthController();