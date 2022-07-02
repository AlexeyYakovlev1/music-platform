const router = require("express").Router();
const FollowController = require("../controllers/follow.controller");

router.get("/:id", FollowController.getByUser);

module.exports = router;