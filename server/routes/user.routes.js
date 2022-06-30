const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/:id", UserController.getOne);

router.post("/add/tracks", authMiddleware, UserController.addTracks);
router.post("/add/playlists", authMiddleware, UserController.addPlaylists);
router.post("/add/owners", authMiddleware, UserController.addOwners);

module.exports = router;