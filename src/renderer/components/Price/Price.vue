<template>
  <div>
    <main>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-stock-id"
            label="stock-id"
            label-for="stock-id"
            description="台灣股票代號"
          >
          <b-form-input
            id="stock-id"
            v-model="form.stock_id"
            type="text"
            required
            placeholder="輸入股票代號"
          ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-start-date"
            label="start-date"
            label-for="start-date"
            description="開始日期"
          >
            <date-picker
              id="start-date"
              v-model="form.start_date"
              required
              placeholder="輸入開始日期"
            ></date-picker>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card-group>
            <b-card v-for="item in card" :key="item">
                <span> {{ item }} </span>
                <font-awesome-icon icon="trash-alt" v-on:click="deleteCard(item)" stockId="item" />
            </b-card>
        </b-card-group>
        
        <b-card class="mt-3" header="走勢圖" v-if="chart.show">
          <line-chart
            :chartdata="chart.data"
            :options="chart.options"
            :updateKey="chart.updateKey"/>
        </b-card>
    </main>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import LineChart from './Chart.vue'

  export default {
    name: 'Price',
    components: { DatePicker, LineChart },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      getDataSet () {
        let dataset = []
        let that = this
        Object.keys(this.chartData).map(function (objectKey, index) {
          let value = that.chartData[objectKey]
          dataset.push({
            label: objectKey,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: value.close
          })
        })

        return dataset
      },
      onSubmit (evt) {
        evt.preventDefault()
        let that = this

        if (that.card.includes(that.form.stock_id)) {
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
          that.chartData[that.form.stock_id] = {
            close: response.data.data.close,
            date: response.data.data.date
          }
          if (!that.card.includes(that.form.stock_id)) {
            that.card.push(that.form.stock_id)
          }
          that.chart.data = {
            labels: response.data.data.date,
            datasets: that.getDataSet()
          }
          that.chart.show = true
        })
      },
      onReset (evt) {
        evt.preventDefault()
        this.form.stock_id = '0050'
        this.form.start_date = this.$moment().format('YYYY-MM-DD')
        this.chart.show = false
        this.card = []
        this.chartData = {}
      },
      deleteCard (stockId) {
        let index = this.card.indexOf(stockId)
        this.card.splice(index, 1)
        delete this.chartData[stockId]
        this.chart.data = {
          labels: this.chartData[this.card[0]].date,
          datasets: this.getDataSet()
        }
        console.log(this.chart.data)
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
          data: [],
          options: null,
          show: false
        },
        card: [],
        chartData: {},
        updateKey: 'chart'
      }
    }
  }
</script>
