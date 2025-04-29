const express = require("express");
const isAuthenticated = require("../middleware/auth");
const validate = require("../middleware/validations");
const { createInvoiceValidator } = require("../validators/invoiceValidators");
const createInvoice = require("../controllers/user/invoices/create");

const router = express.Router();

router.post(
  "/create-invoice",
  [isAuthenticated, validate(createInvoiceValidator)],
  createInvoice
);

module.exports = router;
