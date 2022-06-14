const AuthController = require("../controllers/auth.controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/check", authMiddleware, AuthController.check);

module.exports = router;