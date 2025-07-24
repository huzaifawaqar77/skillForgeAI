const express = require('express');

const router = express.Router();

router.get('/health', function (req, res) {
    res.status(200).json({
        success: true,
        message: 'Hello World!'
    })
})

module.exports = router;