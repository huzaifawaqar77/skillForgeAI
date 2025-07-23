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
            extracted text from a resume/cv document also please make sure there 
            are no strings in the result and its pure a JSON Format and here is 
            the text ${text}`
        });

        return response.text
    } catch (error) {
        console.error('Error occured while formatting the extracted text in ai model: ', error.message);
        throw error;
    }
}


const compareJobWithSkills = async (jobDescription, skillsets) => {
    const prompt = `You are an expert ATS (Applicant Tracking System) scoring engine. Your task is to analyze a given job description and a list of applicant skills to calculate a comprehensive ATS score and provide detailed feedback.

Here's the job description:
---
${jobDescription}
---

Here are the applicant's skills:
---
${skillsets}
---

Based on the above, please perform the following analysis and provide the result in a strict JSON format. Ensure consistency in your output.

**Analysis Steps:**
1.  **Identify Required/Mandatory Skills:** Extract any skills explicitly stated as "required," "must have," "essential," or similar from the job description.
2.  **Identify Desired/Good-to-Have Skills:** Extract any skills that are beneficial but not strictly mandatory.
3.  **Direct Skill Matches:** Find all instances where skills from the applicant's skillsets directly match keywords or phrases in the job description (case-insensitive, consider common variations).
4.  **Semantic Skill Matches:** Identify skills in the applicant's skillset that are semantically related or implied by the job description, even if not directly named. For example, "React.js" matches "JavaScript Frameworks."
5.  **Missing Skills:** List all skills mentioned in the job description (both mandatory and desired) that are NOT present in the applicant's skillsets.
6.  **Irrelevant Skills:** List any skills from the applicant's skillsets that appear to have no relevance to the job description.
7.  **Skill Magnitude/Depth Inference:** Based on the job description, infer the likely required depth or importance of the matched skills (e.g., if "Python" is mentioned multiple times for scripting, data analysis, and automation, its magnitude is high).
8.  **Calculate ATS Score (0-100):**
    * Start with a base score.
    * Award significant points for each *mandatory* skill matched. Missing mandatory skills should incur a heavy penalty or set the score to a low threshold.
    * Award points for *desired* skills matched, with higher points for direct matches.
    * Award points for semantic matches.
    * Deduct points for each *missing* skill (especially mandatory ones).
    * Slightly deduct points for *irrelevant* skills (optional, but good for focus).
    * Consider skill magnitude in the points awarded for matched skills.
    * **The score must be consistent for the same inputs.** Focus on quantifiable matches and clear rules for Gemini to follow.

**Output Format:**

\`\`\`json
{
  "atsScore": 0, // Integer from 0 to 100
  "feedbackSummary": "A concise summary of the ATS analysis.",
  "matchingDetails": {
    "directMatches": [], // Array of strings (e.g., ["JavaScript", "Node.js"])
    "semanticMatches": [], // Array of strings (e.g., ["React.js" for "Frontend Frameworks"])
    "mandatorySkillsMatched": [], // Array of strings
    "desiredSkillsMatched": [] // Array of strings
  },
  "skillAnalysis": {
    "requiredSkillsInJob": [], // All skills identified as mandatory in the JD
    "desiredSkillsInJob": [], // All skills identified as desired in the JD
    "skillsMissingFromApplicant": [], // Skills from JD not in applicant's skillset
    "irrelevantSkillsInApplicant": [], // Skills in applicant's skillset not relevant to JD
    "skillMagnitude": { // Object showing inferred importance/depth for matched skills
        // e.g., "Python": "High", "SQL": "Medium"
    }
  },
  "scoringFactorsConsidered": [
    "Direct Keyword Matching",
    "Semantic Similarity/Contextual Relevance",
    "Mandatory Skills Fulfillment",
    "Skills Magnitude/Depth",
    "Skills Missing (Negative Impact)"
  ]
}
\`\`\`
Ensure the 'atsScore' is an integer between 0 and 100. Be precise and avoid hallucination. If a category has no items, return an empty array.
`;


    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt
        }); // Use a more capable model like 1.5-flash

        const responseText = response.text;

        // Gemini might sometimes wrap JSON in markdown code blocks, so we need to parse it correctly.
        let jsonResponse;
        try {
            // Attempt to parse directly
            jsonResponse = JSON.parse(responseText);
        } catch (parseError) {
            // If direct parse fails, try to extract from markdown code block
            const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                jsonResponse = JSON.parse(jsonMatch[1]);
            } else {
                console.error("Failed to extract JSON from Gemini response:", responseText);
                throw new Error("Invalid JSON response from Gemini API.");
            }
        }

        return jsonResponse;
    } catch (error) {
        console.error("Error occurred while comparing job description to the provided skill sets:", error);
        throw error;
    }
};
module.exports = {
    formatExtractedText,
    compareJobWithSkills
}