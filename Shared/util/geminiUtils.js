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
            model: 'gemini-2.5-flash-lite',
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


const learningPathCreator = async (technology) => {
    const prompt = `
You are an expert curriculum designer.  
Create a learning-path roadmap for **"${technology}"** that can be rendered as a directed graph (React-Flow compatible).

Rules:
1. Produce ONLY valid JSON. Do NOT wrap it in markdown or code fences.
2. The top-level shape MUST be { "nodes": [...], "edges": [...] }.
3. Nodes must contain:
   - id           – short kebab-case string, unique
   - type         – "start" for the very first node, "module" for the rest
   - position     – { x, y } integers; keep y increasing per level
   - data         – { label, level, description?, resources? }
4. Levels: beginner → intermediate → advanced.  
   Provide at least 3-5 modules per level.
5. Edges must contain:
   - id, source, target
   - optional label or type for clarity
6. Ensure every node except "start" has at least one incoming edge.

Example snippet (do NOT copy the technology):
{
  "nodes": [
    { "id": "start", "type": "start", "position": { "x": 0, "y": 0 }, "data": { "label": "Start React", "level": "beginner" } },
    { "id": "jsx",  "type": "module", "position": { "x": 0, "y": 100 }, "data": { "label": "JSX & Components", "level": "beginner", "description": "...", "resources": ["https://react.dev"] } }
  ],
  "edges": [
    { "id": "e-start-jsx", "source": "start", "target": "jsx" }
  ]
}
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt
        });

        // Strip markdown fences if any
        let raw = response.text.trim();
        if (raw.startsWith('```json')) raw = raw.slice(7);
        if (raw.endsWith('```')) raw = raw.slice(0, -3);
        raw = raw.trim();

        const graph = JSON.parse(raw);
        return graph;
    } catch (err) {
        console.error('learningPathCreator error: ', err);
        throw err;
    }
}


const assessmentCreator = async (topic) => {
    try {
        if (!topic) {
            throw new Error("You need to provide an assessment topic to get started");
        }

        // This prompt clearly defines the role, task, and required JSON structure.
        const prompt = `
        You are an expert curriculum developer and subject matter expert.
        Your task is to create a multiple-choice assessment for the topic: "${topic}".

        **Rules & Constraints:**

        1.  Generate a total of 10 questions to form a comprehensive quiz.
        2.  The questions should cover a range of difficulties from easy to moderate.
        3.  For each question, provide 4 options.
        4.  **Crucially, exactly one option must be correct.**
        5.  Your entire output MUST be a single, valid JSON object and nothing else.
        6.  The JSON object must follow this exact structure:
            - A root object with two keys: "topic" and "questions".
            - "questions" is an array of question objects.
            - Each question object must contain:
                - "id": A unique integer for the question (e.g., 1, 2, 3...).
                - "questionText": The string for the question.
                - "options": An array of 4 option objects.
                - "explanation": A brief string explaining why the correct answer is right.
            - Each option object must contain:
                - "text": The string for the answer choice.
                - "isCorrect": A boolean (true for the single correct answer, false for the others).

        Here is an example of the required structure for one question:
        {
          "id": 1,
          "questionText": "What is the primary function of a constructor in a class?",
          "options": [
            { "text": "To destroy the object", "isCorrect": false },
            { "text": "To initialize a new object's state", "isCorrect": true },
            { "text": "To perform a static operation", "isCorrect": false },
            { "text": "To copy the object", "isCorrect": false }
          ],
          "explanation": "The constructor is a special method called automatically when a new object is created to set initial values for its properties."
        }

        Now, generate the complete JSON for the quiz on "${topic}".
        `;


        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt
        })

        let raw = response.text.trim();
        if (raw.startsWith('```json')) raw = raw.slice(7);
        if (raw.endsWith('```')) raw = raw.slice(0, -3);
        raw = raw.trim();

        const assessment = JSON.parse(raw);
        return assessment;
    } catch (error) {
        console.error('Failed to create Assessment for the given topic: ', error);
        throw error;
    }
}


const compareAssessmentTopics = async (source, target) => {
    try {
        if (!source || !target) {
            throw new Error('Both source and target values are mandatory.');
        }

        // If target is an array of objects with a .topic field, flatten it.
        const targetTopics = Array.isArray(target)
            ? target.map(item => item.topic || item)
            : [target];

        // One-shot prompt that forbids any extra chat or prose.
        const prompt = `
Return ONLY the JSON value true or false, nothing else.

Task:
Determine whether the single topic "${source}" is **directly related** to any topic in the list ${JSON.stringify(targetTopics)}.

Definition of "related":  
- Same technology with identical depth (e.g., "NodeJS Basic" vs "NodeJS Basic") → true  
- Same technology but different depth (e.g., "NodeJS Basic" vs "NodeJS Advanced") → false  
- Completely different technologies → false  

Answer with one JSON boolean value only.
`.trim();

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt
        });

        let raw = response.text.trim();

        // Defensive cleanup: remove possible ```json``` fences.
        raw = raw.replace(/^```(?:json)?\s*/i, '');
        raw = raw.replace(/\s*```$/, '');
        raw = raw.trim();

        // Accept only the literal strings "true" or "false".
        if (raw === 'true') return true;
        if (raw === 'false') return false;

        throw new Error(`Unexpected Gemini response: ${raw}`);
    } catch (error) {
        console.error('compareAssessmentTopics error:', error);
        throw error;
    }
};


module.exports = {
    formatExtractedText,
    compareJobWithSkills,
    learningPathCreator,
    assessmentCreator,
    compareAssessmentTopics
}