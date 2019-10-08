<template>
  <div id="wrapper">
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
        <b-card class="mt-3" header="Form Data Result" v-if="chart.show">
          <line-chart
            :chartdata="chart.data"
            :options="chart.options"/>
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
      onSubmit (evt) {
        evt.preventDefault()
        let that = this

        this.$http.post(
          this.$base_url,
          {
            'dataset': 'TaiwanStockPrice',
            'stock_id': this.form.stock_id,
            'date': this.form.start_date
          }
        ).then(function (response) {
          that.chart.data = {
            labels: response.data.data.date,
            datasets: [{
              label: that.form.stock_id,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: response.data.data.close
            }]
          }
          that.chart.show = true
        })
      },
      onReset (evt) {
        evt.preventDefault()
        this.form.stock_id = ''
        this.form.start_date = this.$moment().format('YYYY-MM-DD')
        this.result.show = false
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
        }
      }
    }
  }
</script>
