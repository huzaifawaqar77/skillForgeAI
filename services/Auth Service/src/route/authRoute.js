const express = require("express");
const {
  loginController,
  signupController,
} = require("../controller/authController");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../../Shared/config/Config");
const {
  generateToken,
} = require("../../../../Shared/Middleware/authMiddleware");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user)
      return res.status(401).json({ message: info?.message || "Login failed" });
    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token, user: { ...user, password: undefined } });
  })(req, res, next);
});

// Google OAuth callback
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    console.log(user, err, info);
    if (err || !user) return res.redirect("/login?error=oauth");
    const token = generateToken(user); // Use your JWT logic
    // Option 1: Redirect to frontend with token in query param
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
    // Option 2: Send as JSON if called from Postman
    // res.json({ token, user });
  })(req, res, next);
});

// GitHub OAuth callback
router.get("/github/callback", (req, res, next) => {
  passport.authenticate("github", { session: false }, (err, user, info) => {
    console.log(user, err, info);
    if (err || !user) return res.redirect("/login?error=oauth");
    const token = generateToken(user);
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
    // res.json({ token, user });
  })(req, res, next);
});

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Start GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.post("/register", signupController);

module.exports = router;
