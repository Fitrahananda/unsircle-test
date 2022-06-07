const { Transaction, Company, Item } = require("../models");

class TransactionController {
  static async addTransaction(req, res, next) {
    try {
      const { ItemId, total } = req.body;
      await Transaction.create({ ItemId, total });

      res.status(201).json({
        message: "Add Transaction Success",
        Transaction: { ItemId, total },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findTransaction(req, res, next) {
    try {
      const transtaction = await Transaction.findAll({
        include: [{ model: Item, include: Company }],
      });
      res.status(200).json(transtaction);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      const { ItemId, total } = req.body;
      const { id } = req.params;
      await Transaction.update(
        { ItemId, total },
        {
          where: {
            id,
          },
        }
      );

      res.status(201).json({
        message: "Update Transaction Success",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      await Transaction.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Transaction with id ${id} successfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
