const express = require("express");
const router = express.Router();
const controller = require("./controller");

// login
router.post("/login", controller.login);

// register
router.post("/register", controller.register);

// Edit user profile based on user id (using x-www-form-urlencoded)
router.put("/updateUser/:user_id", controller.updateUser);

// add project
router.post("/addProject/:user_id", controller.addProject);

// add parent project
router.post("/addParent/:project_id", controller.addParent);

// add child project
router.post("/addChild/:parent_id", controller.addChild);

// Delete a project based on id
router.delete("/deleteProject/:project_id", controller.deleteProject);

// Delete a parent project based on id
router.delete("/deleteParent/:parent_id", controller.deleteParent);

// Delete a child project based on id
router.delete("/deleteChild/:child_id", controller.deleteChild);

module.exports = router;