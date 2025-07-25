// create assessment controller function
const {assessmentCreator, compareAssessmentTopics} = require("../../../../Shared/util/geminiUtils");
const {createAssessmentModel, fetchAssessments} = require("../model/assessmentModel");


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

module.exports = {createAssessmentController};