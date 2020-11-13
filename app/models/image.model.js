const sql = require("./db.js");

// constructor
const Image = function(image) {
  this.Project_Id= image.Project_Id;
  this.Image_Data= image.Image_Data;
};

Image.create = (newImage, result) => {
  sql.query("INSERT INTO images SET ?", newImage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created image: ", { id: res.insertId, ...newImage });
    result(null, { id: res.insertId, ...newImage });
  });
};

Image.findById = (id, result) => {
    sql.query(`SELECT * FROM images WHERE Project_Id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found image: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Image with the id
      result({ kind: "not_found" }, null);
    });
};

Image.findByPId = (id, result) => {
  sql.query(`SELECT * FROM images WHERE Project_Id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found image: ", res);
      result(null, res);
      return;
    }

    // not found Image with the id
    result({ kind: "not_found" }, null);
  });
};

Image.getAll = result => {
  sql.query("SELECT Image_Data FROM images", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("images: ", res);
    result(null, res);
  });
};

Image.updateById = (Image_Id, image, result) => {
  sql.query(
    "UPDATE images SET Project_Id = ?, Image_Data = ? WHERE Image_Id = ?",
    [image.Project_Id, image.Image_Data, Image_Id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Image with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated image: ", { id: Image_Id, ...image });
      result(null, { id: Image_Id, ...image });
    }
  );
};

Image.remove = (id, result) => {
  sql.query("DELETE FROM images WHERE Project_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Image with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted image with id: ", id);
    result(null, res);
  });
};

Image.removeAll = result => {
  sql.query("DELETE FROM images", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} images`);
    result(null, res);
  });
};

module.exports = Image;