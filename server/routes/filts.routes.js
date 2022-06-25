const router = require("express").Router();
const FiltsController = require("../controllers/filts.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/add", authMiddleware, FiltsController.add);
router.get("/", FiltsController.getAll);

module.exports = router;