module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
  
    // Create a new Project
    app.post("/comments", comments.create);
  
    // Retrieve all Projects
    app.get("/comments", comments.findAll);
  

    // Retrieve a single Project with userId
    app.get("/comments/:projectId", comments.findUser);

  
    // Update a Project with projectId
    app.put("/comments/:commentId", comments.update);
  
    // Delete a Project with projectId
    app.delete("/comments/:commentId", comments.delete);
  
    // Create a new Project
    app.delete("/comments", comments.deleteAll);
  };