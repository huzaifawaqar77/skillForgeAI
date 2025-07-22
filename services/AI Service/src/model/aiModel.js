const pool = require('../../../../Shared/Database/connection')
const path = require("node:path");
const fs = require("node:fs");
const pdfPoppler = require("pdf-poppler");
const pdfParse = require('pdf-parse')


// Model function to upload the resume/cv for a provided user
const cvUpload = async (originalname, mimetype, size, filePath, userId) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute( // 'pool' is now defined
                'INSERT INTO skillforge_documents (filename, mimetype, size, file_path, user_id) VALUES (?, ?, ?, ?, ?)',
                [originalname, mimetype, size, filePath, userId],
                (err, result) => {
                    if (err) {
                        console.error("Error in the upload pdf model but from the pool promise: ", err);
                        reject(err);
                    } else {
                        console.log("Stored the pdf buffer in the database successfully", result);
                        resolve(result);
                    }
                }
            );
        });

        // Now also convert the pdf to image and store in db
        const pdfPath = path.join(__dirname, '../../../../' + filePath);
        const outputPath = path.join(__dirname, '../../../../uploads/images');
        await convertPdfToImage(pdfPath, outputPath, result.insertId);
        await extractPdfData(
            pdfPath
        )
            .then(extractedText => {
                // Store the extracted text to our database table
                pool.execute(
                    'UPDATE skillforge_documents SET extracted_text = ? WHERE id = ?',
                    [extractedText, result.insertId],
                    (err, result) => {
                        if (err) {
                            console.error('Error in cvUpload model while updating extracted text', err);
                            throw err
                        } else {
                            console.log('Updated the extracted text successfully! ', result);
                            resolve(result);
                        }
                    }
                )
                // Further processing of extractedText can be done here
            })
            .catch(err => {
                console.error('Failed to extract PDF data:', err);
            });

        return result;
    } catch (err) {
        console.error('Error in upload PDF upload model: ', err);
        throw err;
    }
}


// Model functio to fetch all the resume/cv for a provided user
const fetchUserCV = async (userId) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `SELECT *
                 FROM skillforge_documents
                 WHERE user_id = ?`,
                [userId],
                (err, result) => {
                    if (err) {
                        console.error('Error in pool function of fetchUserCV: ', err);
                        reject(err);
                    } else {
                        console.log(`Fetched the user cv/resume successfully for user ${userId}: `, result);
                        resolve(result);
                    }
                }
            )
        });

        return result;
    } catch (err) {
        console.error('Error in the fetchUserCV model function: ', err);
        throw err;
    }
}

// fetch a cv by its ID
const fetchCVByID = async (id) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `SELECT *
                 FROM skillforge_documents
                 WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error in the fetchCVByID pool function: ', err);
                        reject(err);
                    } else {
                        console.log(`Fetched the cv/resume by its id successfully`, result);
                        resolve(result);
                    }
                }
            )
        });
        return result;
    } catch (err) {
        console.error('Error in the fetchCVByID model function: ', err);
        throw err;
    }
}

const storeCVImageToDB = async (imagePath, id) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `UPDATE skillforge_documents
                 SET image_path = ?
                 WHERE id = ?`,
                [imagePath, id],
                (err, result) => {
                    if (err) {
                        console.error('Error in the fetchCVByID pool function: ', err);
                        reject(err);
                    } else {
                        console.log("Successfully inserted the image path", result);
                        resolve(result)
                    }
                }
            )
        });
        return result;
    } catch (err) {
        console.error('Error in store cv image model: ', err);
        throw err;
    }
}


module.exports = {
    cvUpload,
    fetchUserCV,
    fetchCVByID,
    storeCVImageToDB
}


// ===================================Utility Functions=================================
async function convertPdfToImage(pdfFilePath, outputDirectory, id) {
    // First, check if the image file already exists in the database.
    const isImageExist = await fetchCVByID(id);
    if (isImageExist[0].image_path === null) {
        // Ensure output directory exists
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, {recursive: true});
        }

        const options = {
            format: 'jpeg', // or 'png', 'tiff', etc.
            out_dir: outputDirectory,
            out_prefix: path.basename(pdfFilePath, path.extname(pdfFilePath)), // Use the PDF filename as prefix
            page: 1, // null for all pages, or a specific page number
            scale: 1500, // Adjust for desired image quality (e.g., 1500 for good quality)
            jpeg_quality: 90 // For JPEG format
        };

        try {
            await pdfPoppler.convert(pdfFilePath, options);
            const imageUploadPath = "/uploads/images/" + options.out_prefix + "-1.jpg";
            await storeCVImageToDB(imageUploadPath, id)
        } catch (error) {
            console.error('Error during PDF conversion:', error);
        }
    } else {
        console.log("Image already exists! Skipping!!!")
    }
}


// extract text from a pdf document provided its path
async function extractPdfData(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);

        console.log('Number of pages:', data.numpages);
        console.log('Extracted text:\n', data.text);
        // You can also access other metadata like:
        // console.log('Metadata:', data.info);
        // console.log('Number of images:', data.numrender);

        return data.text; // Or return the entire data object
    } catch (error) {
        console.error('Error extracting PDF data:', error);
        throw error;
    }
}