const router = require("express").Router();
const FiltsController = require("../controllers/filts.controller");

router.post("/add", FiltsController.add);
router.get("/", FiltsController.getAll);

module.exports = router;