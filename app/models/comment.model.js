const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.Project_Id=comment.Project_Id;
  this.User_Name= comment.User_Name;
  this.Comment_Data= comment.Comment_Data;
  this.Comment_Date= comment.Comment_Date;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

/*Project.findByName = (userId, result) => {
    sql.query(`SELECT * FROM project WHERE User_Id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found project: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Project with the userId
      result({ kind: "not_found" }, null);
    });
  };*/

  Comment.findByName = (projectId, result) => {
    sql.query(`SELECT * FROM comments WHERE Project_Id = ${projectId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("comments: ", res);
      result(null, res);
    });
  };

  Comment.getAll = result => {
  sql.query("SELECT * FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("comments: ", res);
    result(null, res);
  });
};

Comment.updateById = (Comment_Id, comment, result) => {
  sql.query(
    "UPDATE project SET User_Name = ?, Project_Id = ?, Comment_Data = ?, Comment_Date = ? WHERE Comment_Id = ?",
    [comment.User_Name, comment.Project_Id, comment.Comment_Data, comment.Comment_Date, Comment_Id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Project with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated comment: ", { id: Comment_Id, ...comment });
      result(null, { id: Comment_Id, ...comment });
    }
  );
};

Comment.remove = (id, result) => {
  sql.query("DELETE FROM comments WHERE Project_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Project with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Comment with id: ", id);
    result(null, res);
  });
};

Comment.removeAll = result => {
  sql.query("DELETE FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} comment`);
    result(null, res);
  });
};

module.exports = Comment;