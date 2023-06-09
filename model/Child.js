var dbConn = require("../db");

class Child {
  constructor(todo) {
    this.child_title = todo.child_title;
    this.parent_id = todo.parent_id;
    this.status = todo.status;
  }

  // add project parent
  static add(idParent, child, result) {
    // insert into project table
    dbConn.query(
      `INSERT INTO sprint_child (child_title, parent_id) VALUES(?,?);`,
      [child.child_title, idParent],
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
      "DELETE FROM sprint_child WHERE parent_id = ?",
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

  static deleteByID(idChild, result) {
    dbConn.query(
      "DELETE FROM sprint_child where child_id = ?",
      [idChild],
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

  static done(child_id, status, result) {
    dbConn.query(
      `UPDATE sprint_child SET status = ?  WHERE child_id=?;`,
      [status, child_id],
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

  static getChildByParentID(parent_id, result){
    dbConn.query(
      `SELECT * FROM sprint_child WHERE parent_id =  ?;`,
      [parent_id],
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

module.exports = Child;
