const AudioController = require("../controllers/audio.controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");

// tracks
router.post("/track/add", AudioController.trackAdd);
router.delete("/track/remove/:id", AudioController.trackRemove);
router.get("/tracks", AudioController.trackGetAll);
router.get("/track/:id", AudioController.trackGetOne);
router.get("/track/file/:name", AudioController.getFileByName);

// other info
router.get("/info/playlist/:id", AudioController.infoGetByPlaylist);

// playlists
router.post("/playlist/add", AudioController.playlistAdd);
router.delete("/playlist/remove/:id", AudioController.playlistRemove);
router.get("/playlists", AudioController.playlistGetAll);
router.get("/playlist/:id", AudioController.playlistGetOne);

module.exports = router;