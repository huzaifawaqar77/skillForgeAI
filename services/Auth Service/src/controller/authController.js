const {signupModel} = require('../model/authModel.js')
const bcrypt = require('bcrypt')
const {checkUserExists, checkUsernameExists} = require("../model/authModel");
const {generateToken} = require("../../../../Shared/Middleware/authMiddleware");
const emailValidator = require("node-email-verifier");
const sendVerificationEmail = require("../../../../Shared/emails/emailVerification");


const signupController = async (req, res) => {

    try {
        const {username, firstname, lastname, email, password} = signUpValidator(req, res);

        // check if the email provided is a valid email address
        const isEmailValid = await verifyEmail(email);
        if(!isEmailValid) {
            return res.status(400).json({
                message: "This is not a valid email address"
            })
        }

        // here we have to hash the password now
        const hashedPassword = await bcrypt.hash(password, 10);

        // check if the user already exists
        const userExists = await checkUserExists({email});
        if (userExists.length > 0) {
            return res.status(400).json({
                message: 'User already exists',
            })
        }

        // Next check if the username is available or is already taken
        const usernameExists = await checkUsernameExists({username});
        if(usernameExists.length > 0) {
            return res.status(400).json({
                message: 'This username has already been taken.',
            })
        }
        // pass this data on to the signup model function
        const result = await signupModel(username, firstname, lastname, email, hashedPassword);

        //Before sending the response back, send a verification email to this user

        await sendVerificationEmail({
            id: result.insertId,
            username,
            email,
        });

        // Finally send the response back to the client
        return res.status(200).json({
            message: "User Registration Successful",
            data: result
        })
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const loginController = async (req, res) => {
    const {email, password} = loginValidator(req, res);

    // Check if a user exist by this email
    const userExist = await checkUserExists({email});

    // if user exist then compare his password
    if (userExist.length > 0) {
        const isPasswordMatch = await bcrypt.compare(password, userExist[0].password);

        // Check if password matches with the one stored in the database.
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid password."
            })
        }

        // If password matches, then generate a json web token.
        const token = generateToken(userExist[0]);

        // Finally Send the response back to the client
        return res.status(200).json({
            message: "User Login Successful",
            token: token
        })

    } else {
        return res.status(400).json({
            message: "Invalid email."
        })
    }
}


const logoutController = (req, res) => {
    console.log("logoutController")
}

const resetPasswordController = (req, res) => {
    console.log("resetPasswordController")
}



// validator functions

const signUpValidator = (req, res) => {
    const {username, firstname, lastname, email, password} = req.body;
    if (!username || !firstname || !lastname || !email || !password || !password) {
        throw new Error("All fields are mandatory for user registration.")
    }
    return {
        username,
        firstname,
        lastname,
        email,
        password,
    }
}

const loginValidator = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new Error("Email and password are required")
    }
    return {
        email,
        password,
    }
}

async function verifyEmail(email) {
    try {
        const result = await emailValidator(email, {
            detailed: true,
            checkDisposable: true,
        });
        if (result.format.valid && result.valid && result.mx.valid) {
            console.log('Email has a valid format and MX records.');
            return true;
        } else {
            console.log('Email format or MX records are invalid.');
            return false;
        }
    } catch (error) {
        console.error('Error during email verification:', error);
        throw error;
    }
}



module.exports = {signupController, loginController, logoutController}