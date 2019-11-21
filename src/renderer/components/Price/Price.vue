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
          <b-form-group
            id="input-group-start-date"
            label="開始日期"
            label-for="start-date"
          >
            <date-picker
              id="start-date"
              v-model="form.start_date"
              required
              placeholder="輸入開始日期"
            ></date-picker>
          </b-form-group>
          <b-button type="submit" variant="primary">加入股票</b-button>
          <b-button type="reset" variant="danger">重置</b-button>
        </b-form>
        <b-card-group>
            <b-card v-for="(item, index) in card" :key="item.code">
                <span> {{ item.name }} </span>
                <font-awesome-icon icon="trash-alt" v-on:click="deleteCard(index)" class="float-right" />
                <Icon :stockId="item.code"
                      :stockData="item" />
            </b-card>
        </b-card-group>

        <b-card class="mt-3" header="走勢圖 (單位:台幣)" v-show="chart.show">
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
  import Icon from '../Favorite/Icon'

  export default {
    name: 'Price',
    components: {Icon, DatePicker, LineChart},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onSubmit (evt) {
        evt.preventDefault()
        let that = this
        this.findStock(that.form.stock_id, this.$db, this.remoteApi)
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
          that.chart.data[stock.name] = {
            close: response.data.data.close,
            date: response.data.data.date
          }

          if (!that.inCard(stock)) {
            that.card.push(stock)
          }
          that.chart.count++
          that.chart.show = true
        })
      },
      inCard (stock) {
        for (let item in this.card) {
          if (this.card[item].code === stock.code) {
            return true
          }
        }
        return false
      },
      onReset (evt) {
        evt.preventDefault()
        this.form.stock_id = '0050'
        this.form.start_date = this.$moment().format('YYYY-MM-DD')
        this.chart.show = false
        this.card = []
        this.chart.data = {}
      },
      deleteCard (id) {
        let index = this.card.indexOf(id)
        this.card.splice(index, 1)
        delete this.chart.data[id]
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
        card: []
      }
    }
  }
</script>
