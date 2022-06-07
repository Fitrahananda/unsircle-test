const { tokenVerify } = require("../helper/jwt");
const { User } = require("../models");

const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = tokenVerify(access_token);
    const findUser = await User.findOne({
      where: { id: payload.id },
    });
    if (!findUser) {
      throw { name: "Invalid token" };
    } else {
      req.user = {
        UserId: findUser.id,
      };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = Authentication;
