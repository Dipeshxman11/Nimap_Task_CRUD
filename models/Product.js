const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, references: { model: Category, key: 'id' } },
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
