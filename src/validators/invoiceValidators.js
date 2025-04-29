const { body } = require("express-validator");

const createInvoiceValidator = [
  body("type").notEmpty().withMessage("Invoice type is required"),
  body("amount")
    .notEmpty()
    .withMessage("Invoice amount is required")
    .isFloat()
    .withMessage("Amount must be a float"),
  body("date").notEmpty().withMessage("Invoice Date is required"),
  body("dueDate").notEmpty().withMessage("Invoice Due Date is required"),
  body("penaltyType").notEmpty().withMessage("Invoice penaltyType is required"),
  body("penaltyValue")
    .notEmpty()
    .withMessage("Invoice penaltyValue is required"),
];

module.exports = { createInvoiceValidator }
