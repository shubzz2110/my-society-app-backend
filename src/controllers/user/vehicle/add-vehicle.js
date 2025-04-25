const Vehicle = require("../../../models/Vehicle");

const addVehicleDetails = async (req, res) => {
  try {
    const { vehicleNumber, type, model, parkingSlot } = req.body;
    const { id } = req.user;

    await Vehicle.create({
      vehicleNumber,
      type,
      model,
      parkingSlot,
      residentId: id,
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = addVehicleDetails;
