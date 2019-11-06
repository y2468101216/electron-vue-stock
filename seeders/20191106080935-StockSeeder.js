'use strict';
const axios = require('axios');
require('dotenv').config()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let rows = []

    let response = await axios.post(
      process.env.BASE_URL,
      {
        'dataset': 'TaiwanStockInfo'
      }
    );

    let stockIds = response.data.data.stock_id
    let stockNames = response.data.data.stock_name
    
    let now = new Date()
    stockIds.forEach((element, index) => {
      rows.push({
        name: stockNames[index],
        code: element,
        createdAt: now,
        updatedAt: now
      })
    });

    return queryInterface.bulkInsert('stocks', rows, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('stocks', null, {});
  }
};
