const FamilyMember = require("../../../models/FamilyMember");

const addFamilyMember = async (req, res) => {
  try {
    const { name, relation, gender, contact, photoUrl } = req.body;
    const { id } = req.user;

    await FamilyMember.create({
      name,
      relation,
      gender,
      contact,
      photoUrl,
      residentId: id,
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = addFamilyMember;
