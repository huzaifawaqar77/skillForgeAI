const express = require('express');
const {createAssessmentController, submitAssessmentController} = require("../controller/assessmentController");

const router = express.Router();

// create an assessment for a given subject/topic/field
router.post('/create-assessment', createAssessmentController);

// Submit Assessment Result
router.post('/submit-assessment', submitAssessmentController)

module.exports = router;