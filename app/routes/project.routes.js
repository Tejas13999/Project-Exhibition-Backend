module.exports = app => {
    const projects = require("../controllers/project.controller.js");
  
    // Create a new Project
    app.post("/projects", projects.create);
  
    // Retrieve all Projects
    app.get("/projects", projects.findAll);
  
    // Retrieve a single Project with projectId
    app.get("/projects/:projectId", projects.findOne);

    // Retrieve a single Project with userId
    app.get("/projects/user/:userId", projects.findUser);

    // Retrieve a single Project with technology
    app.get("/projects/technology/:tech", projects.findTech);

    // Retrieve a single Project with department
    app.get("/projects/department/:dept", projects.findDept);

    // Retrieve a single Project with language
    app.get("/projects/language/:lang", projects.findLang);

    // Retrieve a single Project with hardware-kit
    app.get("/projects/hardwarekit/:hkit", projects.findHkit);

    // Retrieve a single Project with title
    app.get("/projects/title/:title", projects.findTitle);

    // Retrieve a single Project with date
    app.get("/projects/date/:date", projects.findDate);

    // Retrieve a single Project with date
    app.get("/projects/multi/:tech/:dept/:title/:lang/:hkit/:date", projects.findMulti);
  
    // Update a Project with projectId
    app.put("/projects/:projectId", projects.update);
  
    // Delete a Project with projectId
    app.delete("/projects/:projectId", projects.delete);
  
    // Create a new Project
    app.delete("/projects", projects.deleteAll);
  };