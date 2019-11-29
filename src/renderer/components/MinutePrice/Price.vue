<template>
  <div>
    <main>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-stock-id"
            label="台灣股票代號或完整名稱"
            label-for="stock-id"
          >
          <b-form-input
            id="stock-id"
            v-model="form.stock_id"
            type="text"
            required
            placeholder="輸入台灣股票代號或完整名稱"
          ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">監視股票</b-button>
          <b-button type="reset" variant="danger">重置</b-button>
        </b-form>
        <b-card-group>
            <b-card v-for="item in card" :key="item">
                <span> {{ item.name }} </span>
                <font-awesome-icon icon="trash-alt" v-on:click="deleteCard(item)" stockId="item" class="float-right" />
                <Icon :stockId="item.code"
                      :stockData="item" />
            </b-card>
        </b-card-group>

        <b-card class="mt-3" header="當日5分鐘走勢圖 (單位:台幣)" v-show="chart.show">
          <line-chart
            :data="chart.data"
            :options="chart.options"
            :count="chart.count"
            :label="chart.label"/>
        </b-card>
    </main>
  </div>
</template>

<script>
  import LineChart from './Chart.vue'
  import Icon from '../Favorite/Icon'

  export default {
    name: 'Price',
    components: {LineChart, Icon},
    props: {
      favoriteStockId: {
        type: String,
        default: null
      }
    },
    mounted: function () {
      if (this.favoriteStockId === null) {
        return null
      }
      let that = this
      this.form.stock_id = this.favoriteStockId
      if (this.timeoutId !== null) {
        window.clearInterval(this.timeoutId)
      }
      this.findStock(this.favoriteStockId, that.$db, that.remoteApi)
      this.timeoutId = window.setInterval(function () {
        that.findStock(that.favoriteStockId, that.$db, that.remoteApi)
      }, 300000)
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onSubmit (evt) {
        evt.preventDefault()
        let that = this
        if (this.timeoutId !== null) {
          window.clearInterval(this.timeoutId)
        }
        this.findStock(that.form.stock_id, that.$db, that.remoteApi)
        this.timeoutId = window.setInterval(function () {
          that.findStock(that.form.stock_id, that.$db, that.remoteApi)
        }, 300000)
      },
      remoteApi (stock) {
        let that = this
        let bodyFrom = new FormData()
        bodyFrom.set('dataset', 'TaiwanStockPriceMinute')
        bodyFrom.set('stock_id', this.form.stock_id)
        bodyFrom.set('date', this.form.start_date)
        this.$http.post(
          this.$base_url,
          bodyFrom, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function (response) {
          that.card = []
          that.chart.data = {
            deal_price: response.data.data.deal_price,
            date: response.data.data.date
          }
          that.chart.label = stock.name

          that.card.push(stock)
          that.chart.count++
          that.chart.show = true
        })
      },
      onReset (evt) {
        evt.preventDefault()
        this.form.stock_id = '0050'
        this.form.start_date = this.$moment().format('YYYY-MM-DD')
        this.chart.show = false
        this.card = []
        this.chart.data = {}
        if (this.timeoutId !== null) {
          window.clearInterval(this.timeoutId)
        }
        this.timeoutId = null
      },
      deleteCard (stockName) {
        let index = this.card.indexOf(stockName)
        this.card.splice(index, 1)
        delete this.chart.data[stockName]
        this.chart.count++

        if (this.card.length === 0) {
          this.chart.show = false
        }
      },
      findStock (input, db, callback) {
        return db.stocks.where({code: input}).or('name').equals(input).first(callback)
      }
    },
    data () {
      return {
        form: {
          stock_id: '0050',
          start_date: this.$moment().format('YYYY-MM-DD'),
          pikaday: ''
        },
        chart: {
          data: {},
          options: null,
          show: false,
          count: 0,
          label: null
        },
        card: [],
        timeoutId: null
      }
    }
  }
</script>
