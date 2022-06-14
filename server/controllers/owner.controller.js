const Message = require("../services/message.service");
const db = require("../db");

class OwnerController {
    async add(req, res) {
        try {
            const { name, filts, avatar } = req.body;
            const queryForFind = `SELECT * FROM owner WHERE name = $1`;
            const findOwner = await db.query(queryForFind, [name]);
            const owner = findOwner.rows[0];

            if (owner) {
                return new Message(400, { success: false }).log(res, `Исполнитель по имени ${name} уже существует`);
            }

            let fls = filts;

            if (typeof fls === "string") {
                fls = JSON.parse(filts);
            }

            const queryForInsert = `INSERT INTO owner(name,filts,avatar) VALUES($1,$2,$3)`;
            const newOwner = await db.query(queryForInsert, [name,fls,avatar]);
            
            return new Message(200, { success: true, owner: newOwner.rows[0] }).log(res, `Исполнитель добавлен`);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const queryForFind = `SELECT * FROM owner WHERE id = $1`;
            const findOwner = await db.query(queryForFind, [id]);

            return new Message(200, { success: true, owner: findOwner.rows[0] }).log(res);
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    };

    async getTracksByTrack(req, res) {
        try {
			const { id } = req.params;
			const queryForFind = `SELECT owners FROM track WHERE id = $1`;
			const findTrack = await db.query(queryForFind, [id]);
            const owners = [];

            for (let i = 0; i < findTrack.rows[0].owners.length; i++) {
                const ownerId = findTrack.rows[0].owners[i];
                const queryForFindOwner = `SELECT * FROM owner WHERE id = $1`;
                const findOwner = await db.query(queryForFindOwner, [ownerId]);
                owners.push(findOwner.rows[0]);
            }

			return new Message(200, { success: true, owners }).log(res);
		} catch(e) {
			return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
		}
    };
}

module.exports = new OwnerController();