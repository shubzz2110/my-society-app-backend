const Vehicle = require("../../../models/Vehicle");

const deleteVehicleDetails = async (req, res) => {
  try {
    const { id } = req.query;
    await Vehicle.destroy({ where: { id: id } });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
module.exports = deleteVehicleDetails;
