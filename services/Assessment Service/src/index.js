const express = require("express");
const app = express();

// import assessment routes here
const assessmentRoutes = require("./route/assessmentRoute");

// route middleware
app.use("/", assessmentRoutes)


app.listen(3003, () => {
    console.log(`😀 Assessment Service is up and Listening on port 3003`);
})