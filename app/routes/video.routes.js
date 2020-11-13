module.exports = app => {
    const videos = require("../controllers/video.controller.js");
  
    // Create a new Video
    app.post("/videos", videos.create);
  
    // Retrieve all Videos
    app.get("/videos", videos.findAll);
  
    // Retrieve a single Video with videoId
    app.get("/videos/:videoId", videos.findOne);
  
    // Update a Video with videoId
    app.put("/videos/:videoId", videos.update);
  
    // Delete a Video with videoId
    app.delete("/videos/:videoId", videos.delete);
  
    // Create a new Video
    app.delete("/videos", videos.deleteAll);
  };