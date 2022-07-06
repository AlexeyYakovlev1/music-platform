const Message = require("../services/message.service");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const { PROJECT_ROOT } = process.env;

class UploadController {
    // upload photo to query dir
    async photo(req, res) {
        try {
            const file = req.files.file;
            const oldFileName = file.name;
            const dir = req.query.dir;
            const extname = path.extname(oldFileName);
            const fileName = `${oldFileName.replace(extname, "")}_${uuid.v4()}${extname}`;
            const avatarsDir = path.relative(PROJECT_ROOT, `./templates/${dir}`);
            const filePath = path.join(avatarsDir, fileName);

            if (!fs.existsSync(avatarsDir)) {
                fs.mkdirSync(avatarsDir, { recursive: true });
            }

            fs.readdir(avatarsDir, (err, files) => {
                if (err) {
                    return new Message(400, { success: false }).log(res, `Не удалось просканировать каталог: ${err.message}`);
                }

                files.forEach(name => {
                    if (name.split("_")[0] === oldFileName.replace(extname, "")) {
                        fs.unlink(path.join(avatarsDir, name), err => {
                            if (err) {
                                return new Message(400, { success: false }).log(res, `Ошибка при удалении файла: ${err.message}`);
                            }
                        })
                    }
                });

                fs.appendFile(filePath, file.data, err => {
                    if (err) {
                        return new Message(400, { success: false })
                            .log(res, `Ошибка при добавлении файла в папку: ${err.message}`);
                    }

                    const fileInBase64 = fs.readFileSync(filePath).toString("base64");
                    const src = `data:image/${extname.replace(".", "")};base64,${fileInBase64}`;

                    return new Message(200, { success: true, file: src, fileName }).log(res);
                });
            });
        } catch(e) {
            return new Message(500, { success: false }).log(res, `Ошибка сервера: ${e.message}`);
        }
    }
}

module.exports = new UploadController();