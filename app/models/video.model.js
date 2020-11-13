const sql = require("./db.js");

// constructor
const Video = function(video) {
  this.Project_Id= video.Project_Id;
  this.Video_Data= video.Video_Data;
};

Video.create = (newVideo, result) => {
  sql.query("INSERT INTO videos SET ?", newVideo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created video: ", { id: res.insertId, ...newVideo });
    result(null, { id: res.insertId, ...newVideo });
  });
};

Video.findById = (id, result) => {
    sql.query(`SELECT * FROM videos WHERE Video_Id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found video: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Video with the id
      result({ kind: "not_found" }, null);
    });
};

Video.getAll = result => {
  sql.query("SELECT * FROM videos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("videos: ", res);
    result(null, res);
  });
};

Video.updateById = (Video_Id, video, result) => {
  sql.query(
    "UPDATE videos SET Project_Id = ?, Video_Data = ? WHERE Video_Id = ?",
    [video.Project_Id, video.Video_Data, Video_Id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Video with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated video: ", { id: Video_Id, ...video });
      result(null, { id: Video_Id, ...video });
    }
  );
};

Video.remove = (id, result) => {
  sql.query("DELETE FROM videos WHERE Video_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Video with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted video with id: ", id);
    result(null, res);
  });
};

Video.removeAll = result => {
  sql.query("DELETE FROM videos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} videos`);
    result(null, res);
  });
};

module.exports = Video;