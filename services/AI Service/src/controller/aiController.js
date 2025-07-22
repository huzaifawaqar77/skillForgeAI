const upload = require('../multerConfig');
const multer = require('multer');
const {cvUpload, fetchUserCV, fetchCVByID, storeCVImageToDB} = require('../model/aiModel');


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
            const result = await cvUpload(originalname, mimetype, size, filePath, userId);
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
const fetchCVForUser = async (req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            return res.status(400).json({success: false, message: 'No user id provided.'});
        } else {
            let result = await fetchUserCV(userId);

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
const fetchCVById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({success: false, message: 'No id provided.'});
        } else {
            const result = await fetchCVByID(id);
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

module.exports = {
    cvUploadController,
    fetchCVForUser,
    fetchCVById
}