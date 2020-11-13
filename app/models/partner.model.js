const sql = require("./db.js");

// constructor
const Partner = function(partner) {
  this.Project_Id= partner.Project_Id;
  this.Name= partner.Name;
  this.User_Id= partner.User_Id;
};

Partner.create = (newPartner, result) => {
  sql.query("INSERT INTO partners SET ?", newPartner, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created partner: ", { id: res.insertId, ...newPartner });
    result(null, { id: res.insertId, ...newPartner });
  });
};

Partner.findById = (id, result) => {
  sql.query(`SELECT * FROM partners WHERE Project_Id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("partners: ", res);
    result(null, res);
  });
};

Partner.findByUser = (id, result) => {
  sql.query(`SELECT * FROM partners WHERE User_Id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("partners: ", res);
    result(null, res);
  });
};

Partner.getAll = result => {
  sql.query("SELECT * FROM partners", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("partners: ", res);
    result(null, res);
  });
};

Partner.updateById = (Partner_Id, partner, result) => {
  sql.query(
    "UPDATE partners SET Project_Id = ?, Name = ?, User_Id = ? WHERE Partner_Id = ?",
    [partner.Project_Id, partner.Name, partner.User_Id, Partner_Id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Partner with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated partner: ", { id: Partner_Id, ...partner });
      result(null, { id: Partner_Id, ...partner });
    }
  );
};

Partner.remove = (id, result) => {
  sql.query("DELETE FROM partners WHERE Project_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Partner with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted partner with id: ", id);
    result(null, res);
  });
};

Partner.removeAll = result => {
  sql.query("DELETE FROM partners", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} partners`);
    result(null, res);
  });
};

module.exports = Partner;