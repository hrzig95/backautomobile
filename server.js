const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");
const bcrypt = require("bcryptjs");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const User = db.user;

db.sequelize.sync().then(() => {
 initial(); // Just use it in development, at the first time execution!. Delete it in production
});



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/voiture.routes")(app);
require("./app/routes/blog.routes")(app);

// set port, listen for requests
//const PORT = config.PORT;
const PORT = 3031;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Just use it in development, at the first time execution!. Delete it in production

function initial() {
  
   User.create({
    role: "admin",
    email:"hrzig95@gmail.com",
    password:bcrypt.hashSync("Haythem12.", 8)
  });
  
  
}


