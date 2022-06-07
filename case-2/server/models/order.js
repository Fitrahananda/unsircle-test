"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasMany(models.OrderMenu);
    }
  }
  Order.init(
    {
      noOrder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "You must input no order" },
          notNull: { msg: "You must input no order" },
        },
      },
      noTable: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "You must input no table" },
          notNull: { msg: "You must input no table" },
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.beforeCreate((instance, option) => {
    instance.status = "aktif";
  });
  return Order;
};
