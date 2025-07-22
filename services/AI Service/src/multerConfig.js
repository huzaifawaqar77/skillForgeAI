const multer = require("multer");
const path = require("path");
const fs = require("node:fs");

// Create the Uploads Directory or Define its path
const uploadDir = path.join(__dirname, "../../../uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Create the memory storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".pdf")
    }
})

// Multer file filter to only allow pdf files.
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
}).single("resume") // resume is the name of the input field with which we will send the pdf file

module.exports = upload;
