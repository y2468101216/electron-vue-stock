<template>
    <b-table small :fields="fields" :items="favorites" responsive="sm">
        <template v-slot:cell(code)="data">
            {{ data.item.code }}
        </template>
        <template v-slot:cell(name)="data">
            {{ data.item.data.name }}
        </template>
        <template v-slot:cell(price)="data">
            {{ prices[data.item.code] ? prices[data.item.code] : 'no data'}}
        </template>
        <template v-slot:cell(action)="data">
            <b-button v-on:click="redirect('price', data.item.code)">收盤走勢圖</b-button>
            <b-button v-on:click="redirect('minute-price', data.item.code)">即時走勢圖</b-button>
        </template>
    </b-table>
</template>

<script>
  export default {
    name: 'List',
    data: function () {
      return {
        favorites: [],
        fields: [
          { key: 'code', label: '股票代碼' },
          { key: 'name', label: '股票名稱' },
          { key: 'price', label: '股票當前成交價(不會即時更新)' },
          { key: 'action', label: '動作' }
        ],
        prices: {}
      }
    },
    mounted () {
      this.renderFavorites()
    },
    methods: {
      renderFavorites () {
        let that = this
        this.$db.favorites.toArray((favorites) => {
          let arr = []
          favorites.forEach(function (element) {
            element.price = 'no data'
            arr.push(element)
            that.getPrice(element)
          })
          that.favorites = arr
        })
      },
      redirect (action, code) {
        this.$router.push({name: action, params: {favoriteStockId: code}})
      },
      getPrice (element) {
        let bodyFrom = new FormData()
        bodyFrom.set('dataset', 'TaiwanStockPriceMinute')
        bodyFrom.set('stock_id', element.code)
        bodyFrom.set('date', this.$moment().format('YYYY-MM-DD'))
        let that = this
        this.$http.post(this.$base_url,
          bodyFrom, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function (response) {
          let price = response.data.data.deal_price.pop()
          that.$set(that.prices, element.code, price)
          that.$forceUpdate()
        })
      }
    }
  }
</script>

<style scoped>

</style>