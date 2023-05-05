const express = require("express");
const router = express.Router();
const controller = require("./controller");

// login
router.post("/login", controller.login);

// register
router.post("/register", controller.register);

// Edit user profile based on user id (using x-www-form-urlencoded)
router.put("/update/:id", controller.update);

module.exports = router;