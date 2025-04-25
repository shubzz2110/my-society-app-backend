const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./User");

const FamilyMember = sequelize.define(
  "FamilyMember",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    relation: {
      type: DataTypes.ENUM("spouse", "child", "parent", "brother", "other"),
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

FamilyMember.belongsTo(User, { foreignKey: "residentId" });

module.exports = FamilyMember;
