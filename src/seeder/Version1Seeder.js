const axios = require('axios')
const Config = require('../config/default')

module.exports = function (db) {
  let bodyFrom = new FormData()
  bodyFrom.set('dataset', 'TaiwanStockInfo')
  return axios.post(
    Config.base_url,
    bodyFrom, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
    let stockIds = response.data.data.stock_id
    let stockNames = response.data.data.stock_name
    db.stocks.clear()
    stockIds.forEach((element, index) => {
      db.stocks.add({
        code: element,
        name: stockNames[index]
      })
    })
  })
}
