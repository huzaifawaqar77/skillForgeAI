const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();

// passport config
require("./passportConfig")(passport);

// passport middleware
app.use(passport.initialize());

// Routes
const authRoutes = require("./route/authRoute");

// express middleware to read request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/auth", authRoutes);

app.listen(3001, (error) => {
  if (error) {
    throw error;
  } else {
    console.log("Authentication Service Up and Running on port 3001");
  }
});
