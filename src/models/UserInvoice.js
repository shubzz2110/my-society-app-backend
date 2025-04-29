const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const User = require("./User");
const Invoice = require("./Invoice");

const UserInvoice = sequelize.define(
  "UserInvoice",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paidOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

UserInvoice.belongsTo(User, { foreignKey: "userId" });
UserInvoice.belongsTo(Invoice, { foreignKey: "invoiceId" })

module.exports = UserInvoice;