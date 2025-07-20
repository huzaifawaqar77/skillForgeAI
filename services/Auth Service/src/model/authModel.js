// import the connection pool here.
const pool = require("../../../../Shared/Database/connection");


// Signup model function
const signupModel = async (username, firstname, lastname, email, password) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `INSERT INTO skillforge_user (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`,
                [username, firstname, lastname, email, password], (error, result) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve(result)
                }
            )
        });
        return result;
    } catch (error) {
        console.error("Error in signup model", error)
        throw error;
    }
}


// check if the there is already registered user by the current details.
const checkUserExists = async (user) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `SELECT * FROM skillforge_user WHERE email = ?`,
                [user.email],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve(result)
                }
            )
        })
        return result;
    } catch (error) {
        console.error("Error checking user existence.", error);
        throw error;
    }
}


// check if user name exists for the current user
const checkUsernameExists = async (user) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute(
                `SELECT * FROM skillforge_user WHERE username = ?`,
                [user.username],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve(result)
                }
            )
        })
        return result;
    } catch (error) {
        console.error("Error checking username existence.", error);
        throw error;
    }
}


const loginModel = async (email, password) => {
    try {
        let result;
        result = await new Promise((resolve, reject) => {
            pool.execute()
        })
    } catch (error) {
        console.error("Error in login model", error);
        throw error;
    }
}

module.exports = {
    signupModel,
    checkUserExists,
    checkUsernameExists,
}
