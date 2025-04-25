const { Op, Sequelize } = require("sequelize");
const User = require("../../models/User");

const getUsers = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      limit = 1,
      offset = 0,
      sortBy,
      search,
      status,
      role,
      wing,
    } = req.query;

    // Define query options
    const queryOptions = {
      where: { id: { [Op.ne]: id } },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [], // Sorting array
    };

    // Apply sorting
    switch (sortBy) {
      case "az":
        queryOptions.order.push(["name", "ASC"]);
        break;
      case "za":
        queryOptions.order.push(["name", "DESC"]);
      default:
        queryOptions.order.push(["createdAt", "DESC"]);
        break;
    }

    // if (search) {
    //   queryOptions.where = {
    //     ...queryOptions.where,
    //     [Op.and]: Sequelize.literal(
    //       `to_tsvector('english', "name") @@ to_tsquery('english', '${search}:*')`
    //     ),
    //   };
    // }

    if (search) {
      queryOptions.where = {
        ...queryOptions.where,
        [Op.or]: [
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("email")), {
            [Op.like]: `%${search.toLowerCase()}%`,
          }),
        ],
      };
    }

    if (status) {
      queryOptions.where = { ...queryOptions.where, status: status };
    }

    if (role) {
      queryOptions.where = { ...queryOptions.where, role: role };
    }

    if (wing) {
      queryOptions.where = { ...queryOptions.where, wing: wing };
    }

    const users = await User.findAll({ ...queryOptions });
    const totalUsers = await User.count({ where: queryOptions.where });
    return res.status(200).json({ users, totalUsers });
  } catch (error) {
    console.log("Error while fetching users", error);
    return res.status(500).send({ success: false, error });
  }
};

module.exports = getUsers;
