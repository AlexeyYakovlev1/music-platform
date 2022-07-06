const router = require("express").Router();
const SettingsController = require("../controllers/settings.controller");
const authMiddleware = require("../middleware/auth.middleware");

// settings for user
router.post("/user", authMiddleware, SettingsController.userChange);
router.post("/user/avatar", authMiddleware, SettingsController.userAvatar);

module.exports = router;