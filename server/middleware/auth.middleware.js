const Message = require("../utils/message.util");
const { verify } = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const { method } = req;

        if (!method) new Message(400, { success: false }).log(res, `Определите метод для запроса`);
        if (method === "OPTIONS") next();

        const { headers } = req;

        if (!headers) new Message(400, { success: false }).log(res, `Определите заголовки для запроса`);
        if (!headers.authorization) new Message(400, { success: false }).log(res, `Ошибка аутентификации`);

        const { authorization } = headers;

        if (!authorization) new Message(400, { success: false }).log(res, `Ошибка аутентификации`);

        const token = authorization.split(" ")[1];

        if (!token) new Message(400, { success: false }).log(res, `Ошибка аутентификации`);

        const decoded = verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return new Message(500, { success: false }).log(res, `Ошибка аутентификации: ${e.message}`);
    }
}