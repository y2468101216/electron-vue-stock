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
                <span> {{ item }} </span>
                <font-awesome-icon icon="trash-alt" v-on:click="deleteCard(item)" stockId="item" />
            </b-card>
        </b-card-group>

        <b-card class="mt-3" header="當日5分鐘走勢圖 (單位:台幣)" v-show="chart.show">
          <line-chart
            :data="chart.data"
            :options="chart.options"
            :count="chart.count"/>
        </b-card>
    </main>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import LineChart from './Chart.vue'

  export default {
    name: 'Price',
    components: {DatePicker, LineChart},
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
        this.timeoutId = window.setInterval(function () {
          that.findStock(that.form.stock_id, that.$db, that.remoteApi)
        }, 300000)
      },
      remoteApi (stock) {
        let that = this
        if (that.card.includes(stock.name)) {
          return
        }
        this.$http.post(
          this.$base_url,
          {
            'dataset': 'TaiwanStockPrice',
            'stock_id': this.form.stock_id,
            'date': this.form.start_date
          }
        ).then(function (response) {
          that.char.data = []
          that.chart.data[stock.name] = {
            deal_price: response.data.data.deal_price,
            date: response.data.data.date
          }

          if (!that.card.includes(stock.name) || that.card.length > 1) {
            that.card.push(stock.name)
          }
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
          count: 0
        },
        card: [],
        timeoutId: null
      }
    }
  }
</script>
