require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize, connectToDatabase } = require('../config/db');
const cookieParser = require("cookie-parser");
const admin = require('firebase-admin');

// ROUTES IMPORT
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const familymembersRoutes = require('./routes/family-member')
const vehicleRoutes = require('./routes/vehicle')
const invoiceRoutes = require('./routes/invoice')

// APP INITIALIZATION
const app = express();

// Configuring firebase admin
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Enable parsing of cookies
app.use(cookieParser());

// MIDDLEWARES
app.use(morgan('dev'));
app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/family-member', familymembersRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/invoice', invoiceRoutes);

// SYNC DATABASE AND START SERVER
const startServer = async () => {
  try {
    await connectToDatabase();
    await sequelize.sync({ alter: true });
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
}

startServer();
