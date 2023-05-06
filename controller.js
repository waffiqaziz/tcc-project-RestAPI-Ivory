const User = require("./model/User");
const Project = require("./model/Project");
const Parent = require("./model/Parent");
const Child = require("./model/Child");

exports.login = function (req, res) {
  const new_user = new User(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.login(new_user, function (err, user) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Login successfully!",
        data: user,
      });
    });
  }
};

exports.register = function (req, res) {
  const new_user = new User(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.register(new_user, function (err, user) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Register successfully!",
        data: user,
      });
    });
  }
};

exports.updateUser = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.update(req.params.user_id, new User(req.body), function (err, user) {
      if (err) res.send(err);
      res.json({ error: false, message: "User profile successfully updated" });
    });
  }
};

exports.addProject = function (req, res) {
  const new_project = new Project(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Project.add(new_project, function (err, project_id) {
      if (err) res.send(err);

      Project.add2workspace(req.params.user_id, project_id, function (err, project) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Add project successfully!",
          project,
        });
      });
    });
  }
};

exports.addParent = function (req, res) {
  const new_parent = new Parent(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Parent.addparent(req.params.project_id, new_parent, function (err, project) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Add parent project successfully!",
        project,
      });
    });
  }
};

exports.addChild = function (req, res) {
  const new_child_project = new Child(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Child.add(req.params.parent_id, new_child_project, function (err, child) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Add child project successfully!",
        child,
      });
    });
  }
};

exports.deleteProject = function (req, res) {
  Parent.getParentIDbyProjectID(req.params.project_id, function (err, parent_id) {
    if (err) res.send(err);
    else{

      Child.deleteByParentID(parent_id, function (err, result) {
        if (err) res.send(err);
      });
    }
  });
  Project.delete(req.params.project_id, function (err, result) {
    if (err) res.send(err);
  });
  Parent.deleteByProjectID(req.params.project_id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: false, message: "Project successfully deleted" });
  });
};

exports.deleteParent = function (req, res) {
  Parent.deleteByParentID(req.params.parent_id, function (err, task) {
    if (err) res.send(err);
  });
  Child.deleteByParentID(req.params.parent_id, function (err, task) {
    if (err) res.send(err);
    res.json({ error: false, message: "Parent Project successfully deleted" });
  });
};

exports.deleteChild = function (req, res) {
  Child.deleteByID(req.params.child_id, function (err, childProject) {
    if (err) res.send(err);
    res.json({ 
      error: false, 
      message: "Child Project successfully deleted" 
    });
  });
};
