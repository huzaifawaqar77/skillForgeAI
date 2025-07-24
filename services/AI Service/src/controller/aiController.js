const upload = require('../multerConfig');
const multer = require('multer');
const {
    cvUploadModel,
    fetchUserCVModel,
    fetchCVByIDModel,
    storeCVImageToDBModel,
    storeATSModel
} = require('../model/aiModel');
const {compareJobWithSkills, learningPathCreator} = require("../../../../Shared/util/geminiUtils");


// Upload the Resume/CV for a given user
const cvUploadController = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({success: false, message: err.message});
        } else if (err) {
            return res.status(500).json({success: false, message: err.message});
        }

        if (!req.file) {
            return res.status(400).json({success: false, message: 'No PDF file uploaded.'});
        }

        console.log("OUR REQUEST.FILE OBJECT HERE:");
        console.log(req.file);


        const {originalname, mimetype, size} = req.file;

        const filePath = `/uploads/${req.file.filename}`;

        const {userId} = req.body;

        try {
            const result = await cvUploadModel(originalname, mimetype, size, filePath, userId);
            console.log("CV Upload result here: ", result);
            res.status(201).json({
                success: true,
                message: 'PDF uploaded and stored in database successfully!',
                data: {
                    id: result.insertId,
                    userId: userId,
                    originalname,
                    filePath,
                    mimetype,
                    size
                    // file_data is not returned to avoid large response bodies
                }
            });
        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({success: false, message: 'Error storing document in database.'});
        }
    });
}


// Fetch All the Resume for a provided user
const fetchCVForUserController = async (req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            return res.status(400).json({success: false, message: 'No user id provided.'});
        } else {
            let result = await fetchUserCVModel(userId);

            return res.status(200).json({
                success: true,
                message: "Fetched all the CV's successfully!",
                data: result
            })
        }
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// Fetch Resume/CV by its ID
const fetchCVByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({success: false, message: 'No id provided.'});
        } else {
            const result = await fetchCVByIDModel(id);
            res.status(200).json({
                success: true,
                message: "Found cv for the given id",
                data: result
            })
        }
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

// calculate the ATS score for a given Resume
const calculateATSController = async (req, res) => {
    try {

        const {id} = req.params;
        const {jobDescription} = req.body;

        // Validate both jobDescription and ID.
        if (!jobDescription || !id) {
            res.status(400).json({success: false, message: 'Please provide a Job Description and Select a Resume/CV.'});
        }

        // Fetch the CV Details
        const CV = await fetchCVByIDModel(id);

        // After fetching CV Details, if ATS was calculated before
        if (CV[0] && CV[0].ats && CV[0].job_description === jobDescription) {
            res.status(200).json({
                success: true,
                message: "Previously Calculated ATS already exists for this job description!.",
                data: JSON.parse(CV[0].ats)
            })
        } else {
            // Check if the CV contains the Skill Sets
            const skillSets = CV[0] && CV[0].extracted_text;

            if (skillSets) {
                // compare the job description with your skills and get your ATS.
                const ATS = await compareJobWithSkills(jobDescription, skillSets);
                await storeATSModel(ATS, jobDescription, id);
                res.status(200).json({
                    success: true,
                    message: "Calculated the ATS Successfully!",
                    data: ATS
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "No Skill Set was Found For this Resume",
                    data: null
                })
            }
        }

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


// Learning path creator controller function
const learningPathCreatorController = async (req, res) => {
    try {
        const {technology} = req.body;
        if (!technology) {
            res.status(400).json({
                success: false,
                message: "You must provide the technology or subject on which you want to generate a learning path."
            })
        } else {
            const learningPath = await learningPathCreator(technology);
            res.status(200).json({
                success: true,
                message: "Learning path created successfully!",
                data: learningPath
            })
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    cvUploadController,
    fetchCVForUserController,
    fetchCVByIdController,
    calculateATSController,
    learningPathCreatorController
}