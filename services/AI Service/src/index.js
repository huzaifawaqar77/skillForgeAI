const express = require("express");
const aiRoutes = require('./route/aiRoute')

const app = express();

// express middleware to read request.body
app.use(express.json());


// api routes
app.use("/", aiRoutes);

app.listen(3002, (error) => {
    if (error) {
        throw error;
    } else {
        console.log("AI Service Up and Running on port 3002");
    }
});
