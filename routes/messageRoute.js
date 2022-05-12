const router = require("express").Router();
const MESSAGE = require("../controllers/messageController");

router.post("/send-message", MESSAGE.sendMessage);
router.get("/get-message", MESSAGE.getMessage);

module.exports = router;
