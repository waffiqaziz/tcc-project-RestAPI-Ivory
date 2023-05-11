var dbConn = require("../db");

class Workspace {
    constructor(todo) {
    this.user_id = todo.user_id;
    this.project_id = todo.project_id;
    this.role_user = todo.role_user;
  }

  static add(workspace, result) {
    dbConn.query(
      `INSERT INTO workspace (user_id, project_id, role_user) VALUES(?,?,?)`,
      [workspace.user_id, workspace.project_id, workspace.role_user],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  }

  static checkUser(workspace, result){
    dbConn.query(
      `SELECT * FROM workspace WHERE user_id = ? AND project_id = ?;`,
      [workspace.user_id, workspace.project_id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else if (!res.length) {
          console.log("Not Yet Added", null);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  } 
  
  static getByProjectID(project_id, result){
    dbConn.query(
      `SELECT * FROM workspace WHERE project_id = ? ;`,
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
}

module.exports = Workspace;