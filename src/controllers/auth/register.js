const User = require("../../models/User");

const registerUser = async (req, res) => {
  try {
    const { firebaseUID, name, email, phone, wing, flatNumber } = req.body;

    await User.create({ firebaseUID, name, email, phone, wing: wing.toUpperCase(), flatNumber });

    return res.status(200).json({ success: true, message: "User registered successfully" })
  } catch (error) {
    console.log("Error while registering user", error);
    return res.status(500).json({ success: false, message: error })
  }
}

module.exports = registerUser;
