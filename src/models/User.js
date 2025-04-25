const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firebaseUID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("resident", "admin", "security", "committee"),
      defaultValue: "resident",
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "disabled"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
