module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new Customer
    app.post("/users", users.create);
  
    // Retrieve all Customers
    app.get("/users", users.findAll);
  
    // Retrieve a single Customer with userId
    app.get("/users/:userId", users.findOne);

    // Retrieve a single Customer with userEmail
    app.get("/users/name/:userId", users.findName);

    // Retrieve a single Customer with userName
    app.get("/users/username/:userId", users.findUserName);
  
    // Update a Customer with customerId
    app.put("/users/:userId", users.update);
  
    // Delete a Customer with customerId
    app.delete("/users/:userId", users.delete);
  
    // Create a new Customer
    app.delete("/users", users.deleteAll);
  };