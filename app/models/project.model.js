const sql = require("./db.js");

// constructor
const Project = function(project) {
  this.Project_Id=project.Project_Id;
  this.User_Id= project.User_Id;
  this.Title= project.Title;
  this.Department= project.Department;
  this.Technology= project.Technology;
  this.Description= project.Description;
  this.Link= project.Link;
  this.Date= project.Date;
  this.Software= project.Software;
  this.Hardware= project.Hardware;
  this.Language= project.Language;
  this.Hardware_Kit= project.Hardware_Kit;
  this.Documentation=project.Documentation;
};

Project.create = (newProject, result) => {
  sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created project: ", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

Project.findById = (id, result) => {
    sql.query(`SELECT * FROM project WHERE Project_Id = ${id}`, (err, res) => {
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
  
      // not found Project with the id
      result({ kind: "not_found" }, null);
    });
};

Project.findByTechnology = (tech, result) => {
  sql.query(`SELECT * FROM project WHERE Technology = '${tech}' ORDER BY Date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.findByDepartment = (dept, result) => {
  sql.query(`SELECT * FROM project WHERE Department = '${dept}' ORDER BY Date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.findByLanguage = (lang, result) => {
  sql.query(`SELECT * FROM project WHERE Language = '${lang}' ORDER BY Date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.findByHardwareKit = (hkit, result) => {
  sql.query(`SELECT * FROM project WHERE Hardware_Kit = '${hkit}' ORDER BY Date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.findByProTitle = (title, result) => {
  sql.query(`SELECT * FROM project WHERE Title = '${title}' ORDER BY Date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.findByDate = (date, result) => {
  sql.query(`SELECT * FROM project WHERE Date > '${date}' ORDER BY Date DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.findByMulti = (tech,dept,title,lang,hkit,date, result) => {
  var q;

  //2
  if(tech!=''&&dept!=''&&title=='No'&&lang=='No'&&hkit=='No'&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}'`;
  }
  else if(tech!=''&&dept=='No'&&title=='No'&&lang!=''&&hkit=='No'&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Language='${lang}'`;
  }
  else if(tech!=''&&dept=='No'&&title=='No'&&lang=='No'&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Hardware_Kit='${hkit}'`;
  }
  else if(tech=='No'&&dept!=''&&title=='No'&&lang!=''&&hkit=='No'&&date=='No' ){
    q=`SELECT * FROM project WHERE Department='${dept}' AND Language='${lang}'`;
  }
  else if(tech=='No'&&dept!=''&&title=='No'&&lang=='No'&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Department='${dept}' AND Hardware_Kit='${hkit}'`;
  }
  else if(tech!=''&&dept=='No'&&title=='No'&&lang=='No'&&hkit=='No'&&date!='' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Date > '${date}'`;
  }
  else if(tech=='No'&&dept!=''&&title=='No'&&lang=='No'&&hkit=='No'&&date!='' ){
    q=`SELECT * FROM project WHERE Department='${dept}' AND Date > '${date}'`;
  }
  else if(tech=='No'&&dept=='No'&&title=='No'&&lang!=''&&hkit=='No'&&date!='' ){
    q=`SELECT * FROM project WHERE Language='${lang}' AND Date > '${date}'`;
  }
  else if(tech=='No'&&dept=='No'&&title=='No'&&lang=='No'&&hkit!=''&&date!='' ){
    q=`SELECT * FROM project WHERE Hardware_Kit='${hkit}' AND Date > '${date}'`;
  }

  //3
  else if(tech!=''&&dept!=''&&title!=''&&lang=='No'&&hkit=='No'&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}'`;
  }
  else if(tech!=''&&dept!=''&&title=='No'&&lang!=''&&hkit=='No'&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Language='${lang}'`;
  }
  else if(tech!=''&&dept!=''&&title=='No'&&lang=='No'&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Hardware_Kit='${hkit}'`;
  }

  //4
  else if(tech!=''&&dept!=''&&title!=''&&lang!=''&&hkit=='No'&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}' AND Language='${lang}'`;
  }
  else if(tech!=''&&dept!=''&&title!=''&&lang=='No'&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}' AND Hardware_Kit='${hkit}'`;
  }
  else if(tech!=''&&dept!=''&&title=='No'&&lang!=''&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Language='${lang}' AND Hardware_Kit='${hkit}'`;
  }
  else if(tech!=''&&dept=='No'&&title!=''&&lang!=''&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Title='${title}' AND Language='${lang}' AND Hardware_Kit='${hkit}'`;
  }
  else if(tech=='No'&&dept!=''&&title!=''&&lang!=''&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Department='${dept}' AND Title='${title}' AND Language='${lang}' AND Hardware_Kit='${hkit}'`;
  }

  //5
  else if(tech!=''&&dept!=''&&title!=''&&lang!=''&&hkit!=''&&date=='No' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}' AND Language='${lang}' AND Hardware_Kit='${hkit}'`;
  }
  else if(tech!=''&&dept!=''&&title!=''&&lang!=''&&hkit=='No'&&date!='' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}' AND Language='${lang}' AND Date > '${date}'`;
  }
  else if(tech!=''&&dept!=''&&title!=''&&lang=='No'&&hkit!=''&&date!='' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}' AND Hardware_Kit='${hkit}' AND Date > '${date}'`;
  }
  else if(tech!=''&&dept!=''&&title=='No'&&lang!=''&&hkit!=''&&date!='' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Language='${lang}' AND Hardware_Kit='${hkit}' AND Date > '${date}'`;
  }
  else if(tech!=''&&dept=='No'&&title!=''&&lang!=''&&hkit!=''&&date!='' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Title='${title}' AND Language='${lang}' AND Hardware_Kit='${hkit}' AND Date > '${date}'`;
  }
  else if(tech=='No'&&dept!=''&&title!=''&&lang!=''&&hkit!=''&&date!='' ){
    q=`SELECT * FROM project WHERE Department='${dept}' AND Title='${title}' AND Language='${lang}' AND Hardware_Kit='${hkit}' AND Date > '${date}'`;
  }

  //6--->All will be there
  else if(tech!=''&&dept!=''&&title!=''&&lang!=''&&hkit!=''&&date!='' ){
    q=`SELECT * FROM project WHERE Technology='${tech}' AND Department='${dept}' AND Title='${title}' AND Language='${lang}' AND Hardware_Kit='${hkit}' AND Date > '${date}'`;
  }

  

  

  

  












  sql.query(q, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
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

  Project.findByName = (userId, result) => {
    sql.query(`SELECT * FROM project WHERE User_Id = ${userId} ORDER BY Date DESC`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("projects: ", res);
      result(null, res);
    });
  };

Project.getAll = result => {
  sql.query("SELECT * FROM project ORDER BY Date DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.updateById = (Project_Id, project, result) => {
  sql.query(
    "UPDATE project SET User_Id = ?, Title = ?, Department = ?, Technology = ?, Description = ?, Link = ?, Date =?, Software =?, Hardware =?, Language =?, Hardware_Kit =? WHERE Project_Id = ?",
    [project.User_Id, project.Title, project.Department, project.Technology, project.Description, project.Link, project.Date, project.Software, project.Hardware, project.Language, project.Hardware_Kit, Project_Id],
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

      console.log("updated project: ", { id: Project_Id, ...project });
      result(null, { id: Project_Id, ...project });
    }
  );
};

Project.remove = (id, result) => {
  sql.query("DELETE FROM project WHERE Project_Id = ?", id, (err, res) => {
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

    console.log("deleted project with id: ", id);
    result(null, res);
  });
};

Project.removeAll = result => {
  sql.query("DELETE FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} project`);
    result(null, res);
  });
};

module.exports = Project;