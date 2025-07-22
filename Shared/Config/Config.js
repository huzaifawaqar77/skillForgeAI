require("dotenv").config({
    path: `${__dirname}/.env`,
});

const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const queueLimit = process.env.DB_QUEUE_LIMIT;

// microservices environment variables below

const authRoute = process.env.AUTH_ROUTE;
const userRoute = process.env.USER_ROUTE;
const learningPathRoute = process.env.LEARNING_PATH_ROUTE;
const aiRoute = process.env.AI_ROUTE;
const assessmentRoute = process.env.ASSESSMENT_ROUTE;
const chatRoute = process.env.CHAIN_ROUTE;
const notificationRoute = process.env.NOTIFICATION_ROUTE;

// Json Web Token environment variable below
const jwtSecret = process.env.JWT_SECRET;

// SMTP environment variables below
const smtpHost = process.env.EMAIL_HOST;
const smtpPort = process.env.EMAIL_PORT;
const smtpUser = process.env.EMAIL_USER;
const smtpPassword = process.env.EMAIL_PASSWORD;
const smtpFrom = process.env.EMAIL_FROM;
const smtpFromName = process.env.EMAIL_FROM_NAME;

// OAuth environment variables below
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

// Gemini API Key
const geminiApiKey = process.env.GEMIN_API_KEY;

module.exports = {
    port,
    host,
    user,
    password,
    database,
    queueLimit,
    authRoute,
    userRoute,
    learningPathRoute,
    aiRoute,
    assessmentRoute,
    chatRoute,
    notificationRoute,
    jwtSecret,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPassword,
    smtpFrom,
    smtpFromName,
    googleClientId,
    googleClientSecret,
    githubClientId,
    githubClientSecret,
    geminiApiKey
};
