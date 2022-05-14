const express = require("express");
const router = express.Router();
const USER = require("../controllers/userController");

router.post("/register", USER.register);
router.post("/login", USER.login);
router.get("/me", USER.me);
router.get("/all-user", USER.getAll);
router.get("/:userId", USER.getUserById);

module.exports = router;
