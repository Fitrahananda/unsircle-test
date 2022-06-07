const { Order } = require("../models");

const authorize = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const order = await Order.findByPk(id);
    if (!order) {
      throw { name: "Not Found" };
    } else if (req.user.role === "kasir") {
      next();
    } else {
      throw { name: "You are not authorized" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authorize;
