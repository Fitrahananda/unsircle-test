'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order)
    }
  }
  OrderMenu.init({
    menu: DataTypes.STRING,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderMenu',
  });
  return OrderMenu;
};