const User = require("../../models/User");

/**
 * @desc Get me
 * @route /api/user/me
 */
const getMe = async (req, res) => {
  try {
    const { firebaseUID } = req.user;
    const user = await User.findOne({
      where: { firebaseUID: firebaseUID },
      attributes: ["name", "email", "id", "avatarUrl", "role", "status"],
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = getMe;
