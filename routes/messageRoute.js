const router = require("express").Router();
const MESSAGE = require("../controllers/messageController");

router.post("/send-message", MESSAGE.sendMessage);
router.get("/get-message/:conversationId", MESSAGE.getMessage);

module.exports = router;
