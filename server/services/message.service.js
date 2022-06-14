class Message {
    constructor(statusCode = 200, data = null) {
        this.statusCode = statusCode;
        this.data = data;
    }

    log(res, message = "") {
        let obj = { message };
        
        if (this.data) {
            obj = Object.assign(obj, this.data);
        }

        return res.status(this.statusCode).json(obj);
    }
}

module.exports = Message;