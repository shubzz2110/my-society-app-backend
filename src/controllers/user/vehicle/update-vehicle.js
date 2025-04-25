const Vehicle = require('../../../models/Vehicle');

const updateVehicleDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const { ...values } = req.body;
    await Vehicle.update({ ...values }, { where: { id: id } });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
module.exports = updateVehicleDetails;
