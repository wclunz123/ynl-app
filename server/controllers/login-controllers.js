const jwt = require("jsonwebtoken");
const db = require("../connection");
const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const TYPES = require("tedious").TYPES;

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    let query = `SELECT * FROM User WHERE userName = '${username}';`;

    try {
        db.query(query, (err, result) => {
            if (err) throw err;
            if (result === null || result.length === 0 || password !== result[0].userPassword) {
                const error = new HttpError("Invalid credentials, please try again.", 401);
                return next(error);
            } else {
                let token;
                try {
                    token = jwt.sign(
                        { username: result[0].userId },
                        "secret_token_ynl",
                        { expiresIn: "2h" }
                    );
                } catch (err) {
                    const error = new HttpError("Logging in failed, please try again.", 500);
                    return next(error);
                }

                res.json({
                    username: result[0].userId,
                    usertype: result[0].userType,
                    token: token
                });
            }
        })
    } catch(err) {
        const error = new HttpError("Something went wrong, could not find the user account.", 500);
        return next(error);
    }
}

exports.loginUser = loginUser;