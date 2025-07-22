const {GoogleGenAI} = require('@google/genai');
const {geminiApiKey} = require("../Config/Config");

const ai = new GoogleGenAI({
    apiKey: geminiApiKey,

});

const formatExtractedText = async (text) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Please convert the provided text in well defined and 
            formatted array or object or combination of both, structure, such 
            that its easily understandale and parsible. You see this is 
            extracted text from a resume/cv document and here is the text ${text}`
        });
        console.log("==================response in formatted manner======================")
        console.log(response.text);
    } catch (error) {
        console.error('Error occured while formatting the extracted text in ai model: ', error.message);
        throw error;
    }
}

module.exports = {
    formatExtractedText
}