const express = require("express");
const { check } = require("express-validator");

const loginControllers = require("../controllers/login-controllers");
const router = express.Router();

router.post(
  "/",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  loginControllers.loginUser
);

module.exports = router;
