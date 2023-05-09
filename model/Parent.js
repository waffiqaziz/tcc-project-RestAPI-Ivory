var dbConn = require("../db");

class Parent {
  constructor(todo) {
    this.parent_title = todo.parent_title;
    this.project_id = todo.project_id;
  }

  // add project parent
  static add(project_id, parent, result) {
    // insert into project table
    dbConn.query(
      `INSERT INTO sprint_parent (parent_title, project_id) VALUES(?,?);`,
      [parent.parent_title, project_id],
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

  static deleteByParentID(parent_id, result) {
    dbConn.query(
      "DELETE FROM sprint_parent WHERE parent_id = ?",
      [parent_id],
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

  static deleteByProjectID(project_id, result) {
    dbConn.query(
      "DELETE FROM sprint_parent WHERE project_id = ?",
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

  static getParentIDbyProjectID(project_id, result) {
    dbConn.query(
      `SELECT parent_id from sprint_parent where project_id = ? ;`,
      [project_id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res[0].parent_id);
        }
      }
    );
  }

  static edit(parent_id, parent, result) {
    dbConn.query(
      `UPDATE sprint_parent SET parent_title =? WHERE parent_id = ?;`,
      [parent.parent_title, parent_id],
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

module.exports = Parent;
