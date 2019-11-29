<template>
    <b-table small :fields="fields" :items="favorites" responsive="sm">
        <template v-slot:cell(code)="data">
            {{ data.item.code }}
        </template>
        <template v-slot:cell(name)="data">
            {{ data.item.data.name }}
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
          { key: 'action', label: '動作' }
        ]
      }
    },
    mounted () {
      this.renderFavorites()
    },
    methods: {
      renderFavorites () {
        let that = this
        this.$db.favorites.toArray((favorites) => {
          that.favorites = favorites
        })
      },
      redirect (action, code) {
        this.$router.push({name: action, params: {favoriteStockId: code}})
      }
    }
  }
</script>

<style scoped>

</style>