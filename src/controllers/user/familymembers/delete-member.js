const FamilyMember = require("../../../models/FamilyMember");

const deleteFamilyMember = async (req, res) => {
  try {
    const { id } = req.query;
    await FamilyMember.destroy({ where: { id: id } });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
module.exports = deleteFamilyMember;
