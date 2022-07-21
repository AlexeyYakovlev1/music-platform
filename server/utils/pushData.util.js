const db = require("../db");

async function pushData(from, tableName, to) {
    for (let i = 0; i < from.length; i++) {
        const id = from[i];
        const queryForFind = `SELECT * FROM ${tableName} WHERE id = $1`;
        const find = await db.query(queryForFind, [id]);

        if (!find.rows[0]) {
            return new Message(400, { success: false }).log(res, `${tableName} по идентификатору ${trackId} не существует`);
        }

        to.push({ ...find.rows[0], follow: true });
    }
}

module.exports = pushData;