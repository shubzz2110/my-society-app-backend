const Vehicle = require("../../../models/Vehicle");

const getAllVehicleDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const vehicles = await Vehicle.findAll({
      where: { residentId: id },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ success: true, vehicles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = getAllVehicleDetails;
