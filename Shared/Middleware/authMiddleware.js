const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../Config/Config");

const generateToken = (user) => {
    let token;
    token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
    }, jwtSecret, {
        expiresIn: '3d'
    });
    return token;
}

module.exports = {
    generateToken,
};