const { compareHash } = require("../helper/bycrypt");
const { tokenCreate } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const option = {
        email,
        password,
        role,
      };

      await User.create(option);

      res.status(201).json({
        message: "Register Success",
        user: { email },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "Invalid email/password" };
      }

      if (!compareHash(password, user.password)) {
        throw { name: "Invalid email/password" };
      }

      const token = tokenCreate({
        id: user.id,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
