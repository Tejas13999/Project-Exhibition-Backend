module.exports = app => {
    const partners = require("../controllers/partner.controller.js");
  
    // Create a new Partner
    app.post("/partners", partners.create);
  
    // Retrieve all Partners
    app.get("/partners", partners.findAll);
  
    // Retrieve a single Partner with projectId
    app.get("/partners/:partnerId", partners.findOne);

    // Retrieve a single Partner with userId
    app.get("/partners/user/:partnerId", partners.findUser);
  
    // Update a Partner with partnerId
    app.put("/partners/:partnerId", partners.update);
  
    // Delete a Partner with partnerId
    app.delete("/partners/:partnerId", partners.delete);
  
    // Create a new Partner
    app.delete("/partners", partners.deleteAll);
  };