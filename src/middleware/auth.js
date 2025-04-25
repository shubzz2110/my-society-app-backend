const admin = require('firebase-admin');
const User = require('../models/User'); // Sequelize User model

const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    
    // Fetch user from your DB
    const user = await User.findOne({ where: { firebaseUID: decoded.uid }});
    if (!user) return res.status(401).send('User not found');

    req.user = {
      firebaseUID: decoded.uid,
      email: decoded.email,
      role: user?.role,
      id: user?.id
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send('Unauthorized');
  }
};

module.exports = isUserAuthenticated;