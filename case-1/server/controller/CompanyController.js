const { Company, Item } = require("../models");

class CompanyController {
  static async addCompany(req, res, next) {
    try {
      const { name, address, description } = req.body;
      const { UserId } = req.user;

      await Company.create({ name, address, description, UserId });

      res.status(201).json({
        message: "Add Company Success",
        Company: { name, address },
      });
    } catch (err) {
      next(err);
    }
  }

  static async findCompany(req, res, next) {
    try {
      const { UserId } = req.user;

      const CompanyById = await Company.findOne({
        where: {
          UserId,
        },
      });
      if (!CompanyById) {
        throw { name: "Not Found" };
      }

      res.status(200).json(CompanyById);
    } catch (err) {
      next(err);
    }
  }

  static async updateCompany(req, res, next) {
    try {
      const { name, address, description } = req.body;
      const { UserId } = req.user;

      await Company.update(
        { name, address, description },
        {
          where: {
            UserId,
          },
        }
      );

      res.status(201).json({
        message: "Update Company Success",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCompany(req, res, next) {
    try {
      const { id } = req.params;
      await Item.destroy({
        where: {
          CompanyId: id,
        },
      });
      await Company.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Company with id ${id} successfully deleted`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = CompanyController;
