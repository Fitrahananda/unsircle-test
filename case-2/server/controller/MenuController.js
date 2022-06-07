const { Menu, Order, OrderMenu } = require("../models");
const { sequelize } = require("../models/index");

class MenuController {
  static async findAllMenu(req, res, next) {
    try {
      const menus = await Menu.findAll({ order: ["id"] });
      if (!menus) {
        throw { name: "not found" };
      }
      res.status(200).json(menus);
    } catch (error) {
      next(error);
    }
  }

  static async postMenu(req, res, next) {
    try {
      const { name, category, status } = req.body;
      const menus = await Menu.create({
        name,
        category,
        status,
      });

      res.status(200).json(menus);
    } catch (error) {
      next(error);
    }
  }

  static async updateMenu(req, res, next) {
    try {
      const { name, category, status } = req.body;
      const { id } = req.params;
      const menus = await Menu.update(
        {
          name,
          category,
          status,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json(menus);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMenu(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      await Menu.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "menu succesfully delete" });
    } catch (error) {
      next(error);
    }
  }

  static async addOrder(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { noTable, menu } = req.body;
      const { id } = req.user;
      const findOrder = await Order.findAll();
      let no;
      if (findOrder.length === 0) {
        no = "001";
      } else {
        const temp = findOrder[findOrder.length - 1].id + 1;
        no = String(temp).padStart(3, "0");
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + dd + +yyyy + "-" + no;
      const noOrder = `ABC${today}`;

      const order = await Order.create(
        { noOrder, noTable, UserId: id },
        { transaction: t }
      );
      let orderMenu = "";
      if (menu.length < 1) {
        orderMenu = "";
      } else {
        orderMenu = menu;
      }

      let menuList = [];
      if (Array.isArray(orderMenu)) {
        orderMenu.forEach((e) => {
          menuList.push({
            OrderId: order.id,
            menu: e,
          });
        });
        await OrderMenu.bulkCreate(menuList, { transaction: t });
      } else {
        await OrderMenu.create(
          {
            OrderId: order.id,
            menu: e,
          },
          { transaction: t }
        );
      }

      await t.commit();
      res.status(201).json({ message: "item create success" });
    } catch (error) {
      await t.rollback();

      next(error);
    }
  }

  static async findOrder(req, res, next) {
    try {
      const { role, id } = req.user;
      let orders;
      if (role === "kasir") {
        orders = await Order.findAll({
          where: {
            status: "aktif",
          },
          include: [
            {
              model: OrderMenu,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          order: ["id"],
        });
      } else {
        orders = await Order.findAll({
          include: [
            {
              model: OrderMenu,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          order: ["id"],
          where: {
            UserId: id,
          },
        });
      }
      if (!orders) {
        throw { name: "not found" };
      }
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
  static async updateOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { menu, noTable } = req.body;

      let orderMenu = "";
      if (menu.length < 1) {
        orderMenu = "";
      } else {
        orderMenu = menu;
      }
      const orderId = await Order.findByPk(id);
      await Order.update(
        { noTable },
        {
          where: {
            id,
          },
        }
      );
      await OrderMenu.destroy({
        where: { OrderId: orderId.id },
      });

      let menuList = [];
      if (Array.isArray(orderMenu)) {
        orderMenu.forEach((e) => {
          menuList.push({
            OrderId: orderId.id,
            menu: e,
          });
        });
        await OrderMenu.bulkCreate(menuList);
      } else {
        await OrderMenu.create({
          OrderId: orderId.id,
          menu: e,
        });
      }

      res.status(201).json({ message: "item update success" });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatusOrder(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const order = await Order.update(
        { status: "nonAktif" },
        {
          where: {
            id,
          },
        }
      );
      if (order < 1) {
        throw { name: "Order not Found" };
      }
      res.status(201).json({ message: "item delete success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = MenuController;
