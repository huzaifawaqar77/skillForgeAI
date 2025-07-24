const express = require('express');
const {
    cvUploadController,
    fetchCVForUserController,
    fetchCVByIdController,
    calculateATSController, learningPathCreatorController
} = require("../controller/aiController");
const {learningPathCreator} = require("../../../../Shared/util/geminiUtils");

const router = express.Router();

// Upload a cv for a given user
router.post('/upload', cvUploadController)


// get all the RESUME for a given user
router.get('/resumes/:userId', fetchCVForUserController)

// get a single resume pdf by it's id
router.get('/resume/:id', fetchCVByIdController);

// calculate the ATS scoring for a given resume/cv
router.post('/resume/ats/:id', calculateATSController);


// Generate a Learning Path for a given technology
router.post('/learning-path', learningPathCreatorController);

module.exports = router;

