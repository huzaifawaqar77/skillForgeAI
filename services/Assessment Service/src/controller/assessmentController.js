// create assessment controller function
const {assessmentCreator, compareAssessmentTopics} = require("../../../../Shared/util/geminiUtils");
const {createAssessmentModel, fetchAssessments, submitAssessmentResultModel} = require("../model/assessmentModel");


// Create assessment Controller Function.
const createAssessmentController = async (req, res) => {
    try {
        const {userId, assessmentTopic} = req.body;
        if (!assessmentTopic) {
            return res.status(400).json({
                success: false,
                message: "No Assessment Topic provided"
            })
        } else {

            // fetch all previous assessments for comparison
            const previousAssessments = await fetchAssessments(userId);

            // Compare Previous Assessments with the current one using AI to see if exists already
            const comparisonResult = await compareAssessmentTopics(assessmentTopic, previousAssessments);

            // If comparison is true it means such an assessment already exists.
            if (comparisonResult === true) {
                return res.status(400).json({
                    success: true,
                    message: "Assessment for this Topic already exists.",
                    data: null
                })
            }
            // generate the assessment content using assessmentCreator function.
            const assessment = await assessmentCreator(assessmentTopic);


            // call the createAssessmentModel to store it in our database.
            await createAssessmentModel({
                userId: userId,
                topic: assessmentTopic,
                content: assessment
            })

            return res.status(200).json({
                success: true,
                message: "Your assessment has been created successfully",
                data: assessment
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// Submit assessment Result Controller Function
const submitAssessmentController = async (req, res) => {
    try {
        const {assessmentResult, assessmentId} = req.body;
        if (!assessmentResult) {
            return res.status(400).json({
                success: false,
                message: "No Assessment Result Provided"
            })
        }

        // Store the assessment result in the database by passing it to the model
        let result = await submitAssessmentResultModel(assessmentResult, assessmentId);
        return res.status(200).json({
            success: true,
            message: "Successfully Submitted",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {createAssessmentController, submitAssessmentController};