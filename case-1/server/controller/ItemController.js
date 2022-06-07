const { Item, Company } = require("../models");

class ItemController {
  static async addItem(req, res, next) {
    try {
      const { name, stock } = req.body;
      const { UserId } = req.user;
      const findCompany = await Company.findOne({
        where: {
          UserId,
        },
      });
      await Item.create({ name, stock, CompanyId: findCompany.id });

      res.status(201).json({
        message: "Add Item Success",
        Item: { name, stock },
      });
    } catch (err) {
      next(err);
    }
  }

  static async findItem(req, res, next) {
    try {
      const { UserId } = req.user;
      const findCompany = await Company.findOne({
        where: {
          UserId,
        },
      });
      const items = await Item.findAll({
        where: {
          CompanyId: findCompany.id,
        },
      });
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }

  static async updateItem(req, res, next) {
    try {
      const { name, stock } = req.body;
      const { id } = req.params;
      await Item.update(
        { name, stock },
        {
          where: {
            id,
          },
        }
      );

      res.status(201).json({
        message: "Update Item Success",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      await Item.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `item with id ${id} successfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ItemController;
