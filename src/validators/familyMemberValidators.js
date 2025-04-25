const { body, query } = require("express-validator");

const addFamilyMemberValidator = [
  body("name").notEmpty().withMessage("Member name is required"),
  body("relation").notEmpty().withMessage("Relation with resident is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
];

const updateFamilyMemberValidator = [
  query("id").notEmpty().withMessage("Member Id is required"),
];

module.exports = { addFamilyMemberValidator, updateFamilyMemberValidator };
