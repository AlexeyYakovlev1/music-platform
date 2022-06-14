const router = require("express").Router();
const OwnerController = require("../controllers/owner.controller");

router.get("/:id", OwnerController.getOne);
router.post("/add", OwnerController.add);
router.get("/track/:id", OwnerController.getTracksByTrack);

module.exports = router;