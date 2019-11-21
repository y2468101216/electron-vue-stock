<template>
    <b-table small :fields="fields" :items="favorites" responsive="sm">
        <template v-slot:cell(code)="data">
            {{ data.item }}
        </template>
        <template v-slot:cell(name)="data">
            {{ data.item.value.name }}
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
          { key: 'name', label: '股票名稱' }
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
      }
    }
  }
</script>

<style scoped>

</style>