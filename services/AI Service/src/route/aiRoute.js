const express = require('express');
const {cvUploadController, fetchCVForUser, fetchCVById} = require("../controller/aiController");

const router = express.Router();

// Upload a cv for a given user
router.post('/upload', cvUploadController)


// get all the RESUME for a given user
router.get('/resumes/:userId', fetchCVForUser)

// get a single resume pdf by it's id
router.get('/resume/:id', fetchCVById)

module.exports = router;

