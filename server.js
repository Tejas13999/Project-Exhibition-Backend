const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var cors = require('cors')

app.use(cors());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
//  res.header("Access-Control-Allow-Methods","GE,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Project Exhibition Application." });
});

require("./app/routes/user.routes.js")(app);

require("./app/routes/project.routes.js")(app);

require("./app/routes/image.routes.js")(app);

require("./app/routes/video.routes.js")(app);

require("./app/routes/partner.routes.js")(app);

require("./app/routes/comment.routes.js")(app);

require("./app/routes/portfolio.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});