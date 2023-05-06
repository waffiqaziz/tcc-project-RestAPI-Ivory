// Import DB Connection from db.js
var dbConn = require("../db");

const md5 = require("blueimp-md5");

// Create new Object, User
class User {
  constructor(todo) {
    this.name = todo.name;
    this.email = todo.email;
    this.pass = md5(todo.pass);
    this.about = todo.about ? todo.about : null;
    this.hobby = todo.hobby ? todo.hobby : null;
    this.skill = todo.skill ? todo.skill : null;
  }

  // login
  static login(user, result) {
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
  }
  // register
  static register(user, result) {
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
  }
  // edit profile
  static update(id, user, result) {
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
  }
}

module.exports = User;

