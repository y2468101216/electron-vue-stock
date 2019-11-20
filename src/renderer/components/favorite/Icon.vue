<template>
    <span>
        <font-awesome-icon icon="star" v-show="isFavorite" />
        <font-awesome-icon :icon="['far', 'star']" v-show="!isFavorite" />
    </span>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      stockId: {
        type: String,
        default: null
      }
    },
    data: {
      isFavorite: false
    },
    methods: {
      addFavorite () {
        let that = this
        this.$db.favorites.where({code: this.stockId}).first((favorite) => {
          if (favorite) {
            return false
          }

          that.$db.favorites.add({
            code: this.stockId
          })

          return true
        })
      }
    }
  }
</script>