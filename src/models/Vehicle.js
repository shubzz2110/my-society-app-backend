const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./User");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    vehicleNumber: { type: DataTypes.STRING, allowNull: false },

    type: DataTypes.ENUM("car", "bike", "other"),

    model: DataTypes.STRING,

    parkingSlot: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    stickerIssued: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

Vehicle.belongsTo(User, { foreignKey: "residentId" });

module.exports = Vehicle;
