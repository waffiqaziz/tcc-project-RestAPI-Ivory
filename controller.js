const User = require("./model");

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

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    User.update(req.params.id, new User(req.body), function (err, user) {
      if (err) res.send(err);
      res.json({ error: false, message: "User profile successfully updated" });
    });
  }
};

// exports.findAll = function (req, res) {
//   Task.findAll(function (err, task) {
//     console.log("controller");
//     if (err) res.send(err);
//     console.log("res", task);
//     res.send(task);
//   });
// };

// exports.findById = function (req, res) {
//   Task.findById(req.params.id, function (err, task) {
//     if (err) res.send(err);
//     res.json(task);
//   });
// };


// exports.delete = function (req, res) {
//   Task.delete(req.params.id, function (err, task) {
//     if (err) res.send(err);
//     res.json({ error: false, message: "Task successfully deleted" });
//   });
// };