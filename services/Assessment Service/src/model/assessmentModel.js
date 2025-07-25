const pool = require("../../../../Shared/Database/connection");


// Create Assessment Model Function
const createAssessmentModel = async (assessmentData) => {
    try {

        // Validate the assessment Data before Insertion into the Database
        if (!assessmentData.userId || !assessmentData.topic || !assessmentData.content) {
            throw new Error('Invalid structure for assessment data');
        }

        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `INSERT INTO skillforge_assessment (user_id, topic, content)
                 VALUES (?, ?, ?)`,
                [assessmentData.userId, assessmentData.topic, assessmentData.content],
                (err, result) => {
                    if (err) {
                        console.error('Error in the pool of create assessment model: ', err);
                        reject(err);
                    } else {
                        console.log('Successfully created the assessment model: ', result);
                        resolve(result);
                    }
                }
            )
        });
        return result;
    } catch (error) {
        console.error('Error while trying to create a new Assessment model...', error);
        if (error.message.includes("Cannot add or update a child row:")) throw new Error("User doesn't exist!");
        throw error;
    }
}

// Fetch Assessments of a given user
const fetchAssessments = async (userId) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `SELECT id, topic
                 FROM skillforge_assessment
                 WHERE user_id = ?`,
                [userId],
                (err, result) => {
                    if (err) {
                        console.error("Failed to fetch assessment, error from pool: ", err);
                        reject(err);
                    } else {
                        console.log('Successfully fetched the assessment data: ', result);
                        resolve(result)
                    }
                }
            )
        });
        return result;
    } catch (error) {
        console.error("Error while fetching Assessments for the user: ", error);
        throw error;
    }
}

module.exports = {
    createAssessmentModel,
    fetchAssessments
}