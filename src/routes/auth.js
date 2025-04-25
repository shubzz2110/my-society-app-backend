const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/auth/register");
const {
  registerUserValidator,
} = require("../validators/userValidators");
const validate = require("../middleware/validations");

router.post("/register", validate(registerUserValidator), registerUser);

module.exports = router;
