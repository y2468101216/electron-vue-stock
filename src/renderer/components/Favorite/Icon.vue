<template>
    <span>
        <font-awesome-icon icon="star" v-show="isFavorite" v-on:click="deleteFavorite()" />
        <font-awesome-icon :icon="['far', 'star']" v-show="!isFavorite" v-on:click="addFavorite()" />
    </span>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      stockId: {
        type: String,
        default: null
      },
      stockData: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        isFavorite: false
      }
    },
    mounted () {
      let that = this
      console.log(this.stockData)
      this.$db.favorites.where({code: this.stockId}).count((count) => {
        if (count >= 1) {
          that.isFavorite = true
        }
      })
    },
    methods: {
      addFavorite () {
        let that = this
        console.log(this.stockData)
        this.$db.favorites.where({code: this.stockId}).count((count) => {
          if (count >= 1) {
            return false
          }

          that.$db.favorites.add({
            code: that.stockId,
            data: that.stockData
          })
          that.isFavorite = true

          return true
        })
      },
      deleteFavorite () {
        let that = this
        this.$db.favorites.where({code: this.stockId}).first((favorite) => {
          that.$db.favorites.delete(favorite.id)
          that.isFavorite = false
        })
      }
    }
  }
</script>