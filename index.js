const express = require('express');
const app = express();
const pool = require("./Shared/Database/connection")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000,
    () => {
        const testConnection = async () => {
            try {
                await pool.execute('SELECT 1');   // quick ping
                console.log('✔ DB connection pool ready');
            } catch (err) {
                console.error('✖ Unable to reach MySQL:', err.message);
                process.exit(1);                  // fail fast during startup
            }
        }
        testConnection().then(r => console.log("✅ Server Started and listening on port 3000"));
})