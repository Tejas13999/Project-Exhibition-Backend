module.exports = app => {
    const portfolios = require("../controllers/portfolio.controller.js");
  
    // Create a new portfolio
    app.post("/portfolios", portfolios.create);
  
    // Retrieve all portfolios
    app.get("/portfolios", portfolios.findAll);
  
    // Retrieve a single portfolio with portfolioId
    app.get("/portfolios/:portfolioId", portfolios.findOne);

    // Retrieve a single portfolio with userId
    app.get("/portfolios/user/:userId", portfolios.findUser);
  
    // Update a portfolios with portfolioId
    app.put("/portfolios/:portfolioId", portfolios.update);
  
    // Delete a portfolio with portfolioId
    app.delete("/portfolios/:portfolioId", portfolios.delete);
  
    // Create a new portfolio
    app.delete("/portfolios", portfolios.deleteAll);

  };