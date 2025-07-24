const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");
const path = require("node:path");

const app = express();


// Serve Static Files
// serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Proxy /auth requests to Auth Service
app.use(
    "/auth",
    createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
    })
);

// Proxy /ai requests to AI Service
app.use(
    "/ai",
    createProxyMiddleware({
        target: "http://localhost:3002",
        changeOrigin: true,
    })
);

// Proxy /assessment requests to Assessment Service
app.use(
    "/assessment",
    createProxyMiddleware({
        target: "http://localhost:3003",
        changeOrigin: true,
    })
);


app.listen(5000, () => {
    console.log("✅ API Gateway started on port 5000");
});
