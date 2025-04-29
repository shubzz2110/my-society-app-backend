const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./User");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("maintenance", "booking"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    penaltyType: {
      type: DataTypes.ENUM("fixed", "percentage"),
      allowNull: false,
    },
    penaltyValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Invoice.belongsTo(User, { foreignKey: "createdBy" });

module.exports = Invoice;
