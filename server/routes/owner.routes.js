const router = require("express").Router();
const OwnerController = require("../controllers/owner.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/:id", OwnerController.getOne);
router.post("/add", authMiddleware, OwnerController.add);
router.get("/track/:id", OwnerController.getTracksByTrack);

module.exports = router;