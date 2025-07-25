const express = require('express');
const {createAssessmentController} = require("../controller/assessmentController");

const router = express.Router();

// create an assessment for a given subject/topic/field
router.post('/create-assessment', createAssessmentController)

module.exports = router;