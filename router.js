const express = require("express");
const router = express.Router();
const controller = require("./controller");

// login
router.post("/login", controller.login);

// register
router.post("/register", controller.register);

// Edit user profile based on user id (using x-www-form-urlencoded)
router.put("/updateUser/:user_id", controller.updateUser);

// Edit parent based on parent id (using x-www-form-urlencoded)
router.put("/editParent/:parent_id", controller.editParent);

// Edit child to done based on chiild id (using x-www-form-urlencoded)
router.put("/doneChild/:child_id", controller.doneChild);

// add project
router.post("/addProject/:user_id", controller.addProject);

// add parent project
router.post("/addParent/:project_id", controller.addParent);

// add child project
router.post("/addChild/:parent_id", controller.addChild);

// add workspace
router.post("/addWorkspace", controller.addWorkspace);

// Delete a project based on id
router.delete("/deleteProject/:project_id", controller.deleteProject);

// Delete a parent project based on id
router.delete("/deleteParent/:parent_id", controller.deleteParent);

// Delete a child project based on id
router.delete("/deleteChild/:child_id", controller.deleteChild);

// get user id by the email
router.get("/getUserIDbyEmail/:email", controller.getUserIDbyEmail);

// get title
router.get("/showProjectTitle/:user_id", controller.showProjectTitle);

// get project
router.get("/getDataProject/:project_id", controller.getDataProject);

// get member project
router.get("/getMemberProject/:project_id", controller.getMemberProject);

// get data user
router.get("/getDataUser/:user_id", controller.getUserData);

// get project user
router.get("/getProjectByUserID/:user_id", controller.getProjectByUserID);

// get data sprint parent
router.get("/getParentByProjectID/:project_id", controller.getParentByProjectID);

// get data sprint child
router.get("/getChildByParentID/:parent_id", controller.getChildByParentID);

// get data sprint child
router.get("/checkInvitedMember", controller.checkInvitedMember);

// get authentication for detail page
router.get("/authDetail/:project_id", controller.authDetail);

module.exports = router;