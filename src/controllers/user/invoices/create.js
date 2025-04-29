const { Op } = require("sequelize");
const Invoice = require("../../../models/Invoice");
const User = require("../../../models/User");
const UserInvoice = require("../../../models/UserInvoice");

const createInvoice = async (req, res) => {
  try {
    const { type, date, amount, dueDate, penaltyType, penaltyValue } = req.body;
    const { id } = req.user;
    console.log(id);
    const invoice = await Invoice.create({
      type,
      amount,
      date,
      dueDate,
      penaltyType,
      penaltyValue,
      createdBy: id,
    });

    const data = await User.findAll({
      where: {
        id: { [Op.ne]: id },
        status: { [Op.eq]: "approved" },
        role: { [Op.eq]: "resident" },
      },
      attributes: ["id"],
    });
    const residents = await JSON.parse(JSON.stringify(data))
    const residentsIds = await residents.map((user) => user.id);

    const userInvoices = residentsIds.map((residentId) => ({
      userId: residentId,
      invoiceId: invoice.id,
      amount: invoice.amount,
    }))
    await UserInvoice.bulkCreate(userInvoices);
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = createInvoice;
