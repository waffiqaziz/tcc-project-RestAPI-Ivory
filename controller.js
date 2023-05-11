const User = require("./model/User");
const Project = require("./model/Project");
const Parent = require("./model/Parent");
const Child = require("./model/Child");
const Union = require("./model/Union");
const Workspace = require("./model/Workspace");

exports.login = function (req, res) {
  const new_user = new User(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.login(new_user, function (err, user) {
      if (err || !user.length) {
        res.json({
          error: 1,
          message:
            "Login Unsuccessfull! The email or password you entered incorrect",
        });
      } else {
        res.json({
          error: 0,
          message: "Login successfully!",
          data: user,
        });
      }
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
      if (err) {
        res.json({
          error: 1,
          message: "Register Unsuccessfull! Email has been added!!!",
        });
      } else {
        res.json({
          error: 0,
          message: "Register successfully!",
          data: user,
        });
      }
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
      res.json({ error: 0, message: "User profile successfully updated" });
    });
  }
};

exports.editParent = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Parent.edit(
      req.params.parent_id,
      new Parent(req.body),
      function (err, user) {
        if (err) res.send(err);
        res.json({ error: 0, message: "Parent successfully updated" });
      }
    );
  }
};

exports.doneChild = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Child.done(req.params.child_id, req.body, function (err, user) {
      if (err) res.send(err);
      res.json({ error: 0, message: "Sprint Child successfully updated" });
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

      Project.add2workspace(
        req.params.user_id,
        project_id,
        function (err, project) {
          if (err) res.send(err);
          res.json({
            error: 0,
            message: "Add project successfully!",
            project,
          });
        }
      );
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
    Parent.add(req.params.project_id, new_parent, function (err, project) {
      if (err) res.send(err);
      res.json({
        error: 0,
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
        error: 0,
        message: "Add child project successfully!",
        child,
      });
    });
  }
};

exports.deleteProject = function (req, res) {
  Parent.getParentIDbyProjectID(
    req.params.project_id,
    function (err, parent_id) {
      if (err) res.send(err);
      else {
        Child.deleteByParentID(parent_id, function (err, result) {
          if (err) res.send(err);
        });
      }
    }
  );
  Project.delete(req.params.project_id, function (err, result) {
    if (err) res.send(err);
  });
  Parent.deleteByProjectID(req.params.project_id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: 0, message: "Project successfully deleted" });
  });
};

exports.deleteParent = function (req, res) {
  Parent.deleteByParentID(req.params.parent_id, function (err, task) {
    if (err) res.send(err);
  });
  Child.deleteByParentID(req.params.parent_id, function (err, task) {
    if (err) res.send(err);
    res.json({ error: 0, message: "Parent Project successfully deleted" });
  });
};

exports.deleteChild = function (req, res) {
  Child.deleteByID(req.params.child_id, function (err, childProject) {
    if (err) res.send(err);
    res.json({
      error: 0,
      message: "Child Project successfully deleted",
    });
  });
};

exports.showProjectTitle = function (req, res) {
  //handles null error
  Union.getTitleForProfile(req.params.user_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully get the data",
        data: data,
      });
    }
  });
};

exports.getDataProject = function (req, res) {
  //handles null error
  Project.getData(req.params.project_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully Get Data Project",
        data: data,
      });
    }
  });
};

exports.getMemberProject = function (req, res) {
  //handles null error
  Union.getMemberProject(req.params.project_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully Get Member Project",
        data: data,
      });
    }
  });
};

exports.getUserData = function (req, res) {
  //handles null error
  User.getData(req.params.user_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully User Data",
        data: data,
      });
    }
  });
};

exports.getProjectByUserID = function (req, res) {
  //handles null error
  Union.getProjectByUserID(req.params.user_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully Get All Project User",
        data: data,
      });
    }
  });
};

exports.getParentByProjectID = function (req, res) {
  //handles null error
  Parent.getParentByProjectID(req.params.project_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully Get Data Parent",
        data: data,
      });
    }
  });
};

exports.getChildByParentID = function (req, res) {
  //handles null error
  Child.getChildByParentID(req.params.parent_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully Get Data Parent",
        data: data,
      });
    }
  });
};

exports.getUserIDbyEmail = function (req, res) {
  //handles null error
  User.getUserIDbyEmail(req.params.email, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "Error",
      });
    } else {
      res.json({
        error: 0,
        message: "Successfully Get UserID",
        data: data,
      });
    }
  });
};

exports.addWorkspace = function (req, res) {
  const new_workspace = new Workspace(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Workspace.add(new_workspace, function (err, user) {
      if (err) {
        res.json({
          error: 1,
          message: "Add Workspace Unsuccessfull! Email has been added!!!",
        });
      } else {
        res.json({
          error: 0,
          message: "Add Workspace successfully!",
          data: user,
        });
      }
    });
  }
};

exports.checkInvitedMember = function (req, res) {
  //handles null error
  const new_workspace = new Workspace(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Workspace.checkUser(new_workspace, function (err, data) {
      if (err || !data.length) {
        res.json({
          error: 1,
          message: "User not yet added",
        });
      } else {
        res.json({
          error: 0,
          message: "User has been added",
          data: data,
        });
      }
    });
  }
};

exports.authDetail = function (req, res) {
  //handles null error
  Workspace.getByProjectID(req.params.project_id, function (err, data) {
    if (err || !data.length) {
      res.json({
        error: 1,
        message: "You are not allowed",
      });
    } else {
      res.json({
        error: 0,
        message: "Access granted",
        data: data,
      });
    }
  });
};
