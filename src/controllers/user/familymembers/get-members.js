const FamilyMember = require("../../../models/FamilyMember");

const getAllMembers = async (req, res) => {
  try {
    const { id } = req.user;
    const members = await FamilyMember.findAll({
      where: { residentId: id },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ success: true, members });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = getAllMembers;
