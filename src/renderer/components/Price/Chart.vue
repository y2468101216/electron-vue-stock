<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    count: {
      type: Number,
      default: 0
    }
  },
  watch: {
    count: function () {
      this.renderChart(this.getChartData(), this.options)
    }
  },
  methods: {
    getDataSet () {
      let dataset = []
      let that = this
      Object.keys(this.data).map(function (objectKey, index) {
        let value = that.data[objectKey]
        dataset.push({
          label: objectKey,
          borderColor: that.getRandomColor(),
          backgroundColor: 'rgba(0, 0, 0, 0)',
          data: value.close
        })
      })

      return dataset
    },
    getDate () {
      let date = []
      let that = this
      Object.keys(this.data).map(function (objectKey, index) {
        let objectDate = that.data[objectKey].date
        date = date.concat(objectDate.filter((item) => date.indexOf(item) < 0))
      })
      return date
    },
    getRandomColor () {
      var letters = '0123456789ABCDEF'.split('')
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    getChartData () {
      return {
        labels: this.getDate(),
        datasets: this.getDataSet()
      }
    }
  }
}
</script>