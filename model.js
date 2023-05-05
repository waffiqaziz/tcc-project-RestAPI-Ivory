// Import DB Connection from db.js
var dbConn = require("./db");
const md5 = require("blueimp-md5");

// Create new Object, User
var User = function (todo) {
  this.name = todo.name;
  this.email = todo.email;
  this.pass = md5(todo.pass);
  this.about = todo.about ? todo.about : null;
  this.hobby = todo.hobby ? todo.hobby : null;
  this.skill = todo.skill ? todo.skill : null;
};

// login
User.login = function (user, result) {
  dbConn.query(
    `SELECT * FROM users WHERE email = ? and password = ?;`,
    [user.email, user.pass],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

// register
User.register = function (user, result) {
  dbConn.query(
    `INSERT INTO users (name, email, password) VALUES(?,?,?)`,
    [user.name, user.email, user.pass],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

// edit profile
User.update = function (id, user, result) {
  dbConn.query(
    `UPDATE users SET name=?, about=?, hobby=?, skill=? WHERE user_id=?;`,
    [user.name, user.about, user.hobby, user.skill, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Find project
Project.findproject = function (id, result) {
  dbConn.query("SELECT * FROM projects WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Task : ", res);
      result(null, res);
    }
  });
};

// // Find Task by Id
// Task.findById = function (id, result) {
//   dbConn.query("SELECT * FROM Task WHERE id = ? ", id, function (err, res) {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//     } else {
//       result(null, res);
//     }
//   });
// };

// // Delete Task
// Task.delete = function (id, result) {
//   dbConn.query("DELETE FROM Task WHERE id = ?", [id], function (err, res) {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

module.exports = User;
