const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/:id", UserController.getOne);

module.exports = router;