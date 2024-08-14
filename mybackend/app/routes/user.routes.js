const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/random", userControllers.getRandomUsers);

router.get("/:username", userControllers.getUser);
router.patch("/:id", verifyToken, userControllers.updateUser);

router.get("/profile/:id", userControllers.getUserProfile);
router.put("/profile/:id", userControllers.updateUserProfile);

module.exports = router;
