const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

const {
  googleClientId,
  googleClientSecret,
  githubClientId,
  githubClientSecret,
} = require("../../../Shared/config/Config");
// import pool
const pool = require("../../../Shared/Database/connection");
const { checkUserExists } = require("./model/authModel");
const bcrypt = require("bcrypt"); // If you want to generate a random password hash

module.exports = function (passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Check if the user exists by this email
          const isUserExists = await checkUserExists({ email });
          if (isUserExists.length > 0) {
            // Check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(
              password,
              isUserExists[0].password
            );
            if (isPasswordCorrect) {
              return done(null, isUserExists[0]);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/google/callback",
        scope: "profile email",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile here: ", profile);
        try {
          const email = profile.emails[0].value;
          const username =
            profile.displayName || profile.emails[0].value.split("@")[0];
          const firstname = profile.name?.givenName || "";
          const lastname = "";

          // Database related Operations here.
          pool.execute(
            `SELECT * FROM skillforge_user WHERE email = ?`,
            [email],
            (err, result) => {
              if (err) {
                console.error(
                  "Error in email selection from passport config: ",
                  err
                );
                return done(err);
              } else {
                if (result.length > 0) {
                  return done(null, result[0]);
                } else {
                  // create a new user
                  pool.execute(
                    `INSERT INTO skillforge_user (username, firstname, lastname, email, password, is_email_verified) VALUES (?, ?, ?, ?, ?, ?)`,
                    [username, firstname, lastname, email, null, 1],
                    (err, result) => {
                      if (err) {
                        console.error(
                          "Error in creating a new user from passport config: ",
                          err
                        );
                        return done(err);
                      } else {
                        console.log(
                          "New user created from passport config: ",
                          result
                        );
                        return done(null, result);
                      }
                    }
                  );
                }
              }
            }
          );
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Github Strategy
  passport.use(
    new GithubStrategy(
      {
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL: "/auth/github/callback",
        scope: "user:email",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Profile here: ", profile);
          // Check if email is available
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : null;
          if (!email) {
            return done(null, false, {
              message: "GitHub account has no public email",
            });
          }
          const username = profile.username || email.split("@")[0];
          const firstname = profile.displayName || "";
          const lastname = ""; // GitHub doesn't provide this

          console.log("Email over here: ", email, username, firstname);

          // Check if user exists
          pool.execute(
            "SELECT * FROM skillforge_user WHERE email = ?",
            [email],
            (err, result) => {
              if (err) {
                console.error(
                  "Error in email selection from passport config: ",
                  err
                );
                return done(err);
              } else {
                console.log("Email Selection Result: ", result);
                if (result.length > 0) {
                  return done(null, result[0]);
                } else {
                  // create a new user
                  pool.execute(
                    `INSERT INTO skillforge_user (username, firstname, lastname, email, password, is_email_verified) VALUES (?, ?, ?, ?, ?, ?)`,
                    [username, firstname, lastname, email, null, 1],
                    (err, result) => {
                      if (err) {
                        console.error(
                          "Error in creating a new user from passport config: ",
                          err
                        );
                        return done(err);
                      } else {
                        console.log(
                          "New user created from passport config: ",
                          result
                        );
                        return done(null, result);
                      }
                    }
                  );
                }
              }
            }
          );
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
