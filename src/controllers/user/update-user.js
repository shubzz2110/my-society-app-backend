const User = require("../../models/User");

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { ...values } = req.body;
    await User.update({ ...values }, { where: { id: id } });
    const updatedUser = await User.findByPk(id)
    return res.status(200).json({ success: true, updatedUser })
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
module.exports = updateUser;
