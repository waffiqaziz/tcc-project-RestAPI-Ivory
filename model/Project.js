var dbConn = require("../db");

class Project {
  constructor(todo) {
    this.title = todo.title;
    this.description = todo.description;
    this.deadline = todo.deadline;
    this.status = todo.status ? todo.status : 0;
    this.created_at = todo.created_at;
  }
  // add new project
  static add(project, result) {
    // insert into project table
    dbConn.query(
      `INSERT INTO projects (title, description, deadline, status, created_at) VALUES(?,?,?,?,?);`,
      [
        project.title,
        project.description,
        project.deadline,
        project.status,
        project.created_at,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          dbConn.query(
            `SELECT LAST_INSERT_ID() as project_id from projects`,
            function (err, res) {
              if (err) {
                console.log("error: ", err);
                result(null, err);
              } else {
                result(null, res[0].project_id);
              }
            }
          );
        }
      }
    );
  }

  // add new project into workspace
  static add2workspace(user_id, project_id, result) {
    dbConn.query(
      `INSERT INTO workspace (user_id, project_id, role_user) VALUES(?,?,0);`,
      [user_id, project_id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          dbConn.query(
            `INSERT INTO sprint_parent (parent_title, project_id) VALUES('New...', ?);`,
            [project_id],
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
    );
  }

  static delete(project_id, result){
    dbConn.query(
      "DELETE FROM projects WHERE project_id = ?;",
      [project_id],
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

  static getData(project_id, result){
    dbConn.query(
      "SELECT * FROM projects WHERE project_id = ?;",
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

module.exports = Project;
