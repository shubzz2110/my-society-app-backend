const express = require("express");
const isUserAuthenticated = require("../middleware/auth");
const validate = require("../middleware/validations");
const {
  addVehicleValidator,
  updateOrDeleteVehicleValidator,
} = require("../validators/vehicleValidators");
const addVehicleDetails = require("../controllers/user/vehicle/add-vehicle");
const getAllVehicleDetails = require("../controllers/user/vehicle/get-vehicles");
const updateVehicleDetails = require("../controllers/user/vehicle/update-vehicle");
const deleteVehicleDetails = require("../controllers/user/vehicle/delete-vehicle");

const router = express.Router();

router.post(
  "/add-vehicle",
  [isUserAuthenticated, validate(addVehicleValidator)],
  addVehicleDetails
);
router.get("/get-my-vehicles", [isUserAuthenticated], getAllVehicleDetails);
router.put(
  "/update-vehicle-details",
  [isUserAuthenticated, validate(updateOrDeleteVehicleValidator)],
  updateVehicleDetails
);
router.delete(
  "/delete-vehicle",
  [isUserAuthenticated, validate(updateOrDeleteVehicleValidator)],
  deleteVehicleDetails
);

module.exports = router;
