const nodemailer = require("nodemailer");
const {smtpFromName, smtpFrom, smtpHost, smtpPort, smtpUser, smtpPassword, jwtSecret} = require("../Config/Config");
const jwt = require("jsonwebtoken");
const pool = require('../Database/connection')

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true, // true for 465, false for other ports
    auth: {
        user: smtpUser,
        pass: smtpPassword,
    },
});


const sendVerificationEmail = async (user) => {
    try {
        const verificationToken = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, jwtSecret, {expiresIn: '10m'});

        const verificationLink = `http://localhost:3001/verify?token=${verificationToken}`;


        const emailTemplate = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - UIFlexer</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'); /* Using Poppins for modern feel */

        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f0f2f5; /* Light grey background */
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            width: 100% !important;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        td {
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .header {
            background: linear-gradient(to right, #6A11CB 0%, #2575FC 100%); /* Purple to Blue Gradient */
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            line-height: 1.2;
        }

        .content {
            padding: 30px 40px;
            color: #333333;
            line-height: 1.6;
        }

        .content p {
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 300;
        }

        .content strong {
            font-weight: 600;
        }

        .button-area {
            text-align: center;
            padding: 20px 40px;
        }

        .button {
            display: inline-block;
            background-color: #2575FC; /* Bright Blue for contrast */
            color: #ffffff !important; /* White text for strong contrast */
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 17px;
            font-weight: 600;
            transition: background-color 0.3s ease;
            box-shadow: 0 4px 10px rgba(37, 117, 252, 0.3); /* Subtle button shadow */
        }

        .button:hover {
            background-color: #1a5ac9; /* Slightly darker blue on hover */
        }

        .footer {
            text-align: center;
            padding: 20px 40px;
            background-color: #f8f9fa; /* Lighter grey for footer */
            color: #777777;
            font-size: 13px;
            border-top: 1px solid #eeeeee;
        }

        .footer p {
            margin: 0;
        }

        .footer a {
            color: #777777;
            text-decoration: none;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 620px) {
            .container {
                margin: 20px auto;
                border-radius: 0;
                box-shadow: none;
            }
            .content, .button-area, .footer {
                padding: 20px;
            }
            .header h1 {
                font-size: 24px;
            }
            .content p {
                font-size: 15px;
            }
            .button {
                padding: 12px 25px;
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to UIFlexer!</h1>
        </div>

        <div class="content">
            <p>Hello <strong>${user.username}</strong>,</p>
            <p>Thank you for creating an account with **UIFlexer**! We're thrilled to have you join our community.</p>
            <p>To complete your registration and unlock full access to our services, please verify your email address by clicking the button below:</p>
            
            <div class="button-area">
                <a href="${verificationLink}" class="button" target="_blank">Verify My Email</a>
            </div>

            <p>This verification link is valid for **10 minutes**. If you did not sign up for an account with UIFlexer, please ignore this email.</p>
            <p>Best regards,<br>The UIFlexer Team</p>
        </div>

        <div class="footer">
            <p>&copy; 2025 **UIFlexer**. All rights reserved.</p>
            <p>
                <a href="https://www.uiflexer.com/privacy" target="_blank">Privacy Policy</a> | 
                <a href="https://www.uiflexer.com/terms" target="_blank">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
        `;

        const info = await transporter.sendMail({
            from: `${smtpFromName} <${smtpFrom}>`,
            to: `${user.email}`,
            subject: "Verify Your Email",
            html: emailTemplate,
        });

        // query the db and insert the token
        await new Promise((resolve, reject) => {
            pool.execute(
                `UPDATE skillforge_user
                 SET token = ?
                 WHERE id = ?`,
                [verificationToken, user.id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            )
        })

        console.log("✅ Message sent:", info.messageId);
    } catch (error) {
        console.error("🌡 Error in sendVerificationEmail: ", error);
        throw error;
    }
};
module.exports = sendVerificationEmail;