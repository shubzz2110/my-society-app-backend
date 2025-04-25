const { body, query } = require("express-validator");

const registerUserValidator = [
  body("firebaseUID").notEmpty().withMessage("firebaseUID is required"),
  body("name").notEmpty().withMessage("Full name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("en-IN")
    .withMessage("Phone number must be valid 10 digit"),
  body("wing").notEmpty().withMessage("Wing is required"),
  body("flatNumber").notEmpty().withMessage("flatNumber is required"),
];

const updateUserValidator = [
  query('id').notEmpty().withMessage('User Id is required')
]

module.exports = { registerUserValidator, updateUserValidator };
