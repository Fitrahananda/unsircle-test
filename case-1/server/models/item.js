"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Transaction);
      this.belongsTo(models.Company);
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "You must input name item" },
          notNull: { msg: "You must input name item" },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "You must input stock item" },
          notNull: { msg: "You must input stock item" },
        },
      },
      CompanyId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
