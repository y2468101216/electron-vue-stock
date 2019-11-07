const axios = require('axios')
const Config = require('config')

module.exports = function (db) {
  axios.post(
    Config.get('base_url'),
    {
      'dataset': 'TaiwanStockInfo'
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
