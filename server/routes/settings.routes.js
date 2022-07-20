const router = require("express").Router();
const SettingsController = require("../controllers/settings.controller");
const authMiddleware = require("../middleware/auth.middleware");

// settings for user
router.put("/user", authMiddleware, SettingsController.userChange);
router.put("/user/avatar", authMiddleware, SettingsController.userAvatar);

module.exports = router;