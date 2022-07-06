const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const UploadController = require("../controllers/upload.controller");

router.post("/photo", authMiddleware, UploadController.photo);

module.exports = router;