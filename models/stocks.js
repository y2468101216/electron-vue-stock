'use strict';
module.exports = (sequelize, DataTypes) => {
  const stocks = sequelize.define('stocks', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  stocks.associate = function(models) {
    // associations can be defined here
  };
  return stocks;
};