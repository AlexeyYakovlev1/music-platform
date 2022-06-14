const Message = require("../services/message.service");
const { verify } = require("jsonwebtoken");

module.exports = async function(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        
        if (!token) {
            new Message(400, { success: false }).log(res, `Ошибка ауфентикации`);    
        }

        const decoded = verify(token, process.env.JWT_KEY);
        
        req.user = decoded;
        
        next();
    } catch(e) {
        new Message(500, { success: false }).log(res, `Ошибка ауфентикации: ${e.message}`);
    }
}