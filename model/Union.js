var dbConn = require("../db");

class Union {
  static getTitleForProfile(user_id, result) {
    dbConn.query(
      "SELECT p.* FROM projects p, users u, workspace w WHERE u.user_id = w.user_id and p.project_id = w.project_id and u.user_id = ?;",
      [user_id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else if (!res.length) {
          console.log("", null);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  }

  static getMemberProject(project_id, result) {
    dbConn.query(
      "SELECT u.* FROM projects p, users u, workspace w WHERE u.user_id = w.user_id and p.project_id = w.project_id and p.project_id = ?;",
      [project_id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else if (!res.length) {
          console.log("Not Found", null);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  }

  static getProjectByUserID(user_id, result) {
    dbConn.query(
      "SELECT p.* FROM projects p, users u, workspace w WHERE u.user_id = w.user_id and p.project_id = w.project_id and u.user_id = ?;",
      [user_id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else if (!res.length) {
          console.log("Not Found", null);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  }
}

module.exports = Union;
