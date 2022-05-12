const router = require("express").Router();
const CONVERSATION = require("../controllers/conservationController");

router.post("/create-conversation", CONVERSATION.createConservation);
router.get("/get-conversation/:userId", CONVERSATION.getConservationOfUser);

module.exports = router;
