const express = require("express");
const router = express.Router();
const controller = require("./controller");

// // Get All Task
// router.get("/", controller.findAll);

// login
router.post("/login", controller.login);

// register
router.post("/register", controller.register);

// // Get Task by Id
// router.get("/:id", controller.findById);

// // Update a Task based on task id
// router.put("/:id", controller.update);

// // Delete a Task based on task id
// router.delete("/:id", controller.delete);

module.exports = router;