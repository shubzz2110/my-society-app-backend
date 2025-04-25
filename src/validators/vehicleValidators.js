const { body, query } = require("express-validator");

const addVehicleValidator = [
  body("vehicleNumber").notEmpty().withMessage("vehicleNumber is required"),
  body("type").notEmpty().withMessage("Vehicle type is required"),
  body("model").notEmpty().withMessage("Vehicle model is required"),
];

const updateOrDeleteVehicleValidator = [
  query("id").notEmpty().withMessage("Vehicle Id is required"),
];

module.exports = { addVehicleValidator, updateOrDeleteVehicleValidator };
