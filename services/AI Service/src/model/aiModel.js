const pool = require('../../../../Shared/Database/connection')
const path = require("node:path");
const fs = require("node:fs");
const pdfPoppler = require("pdf-poppler");
const pdfParse = require('pdf-parse')
const {formatExtractedText, compareJobWithSkills} = require("../../../../Shared/util/geminiUtils");


// Model function to upload the resume/cv for a provided user
const cvUploadModel = async (originalname, mimetype, size, filePath, userId) => {
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

        // Convert the pdf file to image jpg and store in our server
        await convertPdfToImage(pdfPath, outputPath, result.insertId);

        // extract the text from it and store it in a variable
        const extractedText = await extractPdfData(pdfPath);

        // convert the extracted text into a human-readable format.
        const extractedTextFormatted = await formatExtractedText(extractedText);

        // Create a new promise to insert this formatted text into our table
        await new Promise((resolve, reject) => {
            pool.execute(
                `UPDATE skillforge_documents
                 SET extracted_text = ?
                 WHERE id = ?`,
                [extractedTextFormatted, result.insertId],
                (err, result) => {
                    if (err) {
                        console.error('Error while updating the formatted extracted text in cvUpload: ', err);
                        throw err;
                    } else {
                        console.log('Updated the formatted extracted text successfully: ', result);
                        resolve(result)
                    }
                }
            )
        });

        // compare the given skillsets to a given job description

        const ATS = await compareJobWithSkills("About the job\n" +
            "Company Description\n" +
            " \n" +
            "ThreadX is committed to revolutionizing the leather industry by transforming raw leather into high-quality products such as leather jackets and leather goods. Combining the finest leather with modern craftsmanship, our techniques include embroidery, appliqué, stud detailing, and glass beading to create unique, premium designs for the global market. Our mission is to elevate Pakistan’s leather exports by empowering local artisans with the tools and training needed to meet international standards. Based in Karāchi, ThreadX strives to bring global recognition to Pakistan’s renowned leather quality.\n" +
            "\n" +
            " Role Description\n" +
            " \n" +
            "This is a full-time, on-site role located in Karāchi for a Full Stack Engineer. The Full Stack Engineer will be responsible for designing, developing, and maintaining both the front-end and back-end components of web applications. Daily tasks include writing and reviewing code, troubleshooting software issues, and collaborating with other team members to deliver high-quality software solutions. Attention to detail and problem-solving skills are critical to ensure optimal performance and a seamless user experience.\n" +
            "\n" +
            " Qualifications\n" +
            " \n" +
            "Proficiency in Front-End Development and Cascading Style Sheets (CSS)\n" +
            "Experience in Back-End Web Development and Full-Stack Development\n" +
            "Strong foundation in Software Development principles and best practices\n" +
            "Excellent problem-solving skills and attention to detail\n" +
            "Ability to work effectively in a collaborative on-site team environment\n" +
            "Bachelor's degree in Computer Science, Engineering, Information Technology, or related field\n" +
            "Experience in the leather and fashion industry is a plus", extractedTextFormatted)

        // console log the ATS Result
        console.log("========================ATS======================");
        console.log(ATS);


        return result;
    } catch (err) {
        console.error('Error in upload PDF upload model: ', err);
        throw err;
    }
}


// Model functio to fetch all the resume/cv for a provided user
const fetchUserCVModel = async (userId) => {
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
const fetchCVByIDModel = async (id) => {
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

const storeCVImageToDBModel = async (imagePath, id) => {
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

// Calculate the ATS Based on a given pdf file.
const calculateATSModel = async () => {

}

module.exports = {
    cvUploadModel,
    fetchUserCVModel,
    fetchCVByIDModel,
    storeCVImageToDBModel,
    calculateATSModel
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