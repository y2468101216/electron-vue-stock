<template>
  <div id="app" class="container-fluid">
    <main>
        <b-navbar toggleable="lg" type="dark" variant="info" class="row">
          <b-navbar-brand href="#">Electron Vue Stock</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">
                <router-link to="/">首頁</router-link>
                <router-link to="/price">收盤走勢圖</router-link>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      <div>
          <router-view></router-view>
      </div>
      <div>
        <b-modal ref="load-modal" hide-footer hide-header-close title="下載股票資料">
          <p class="my-4">請等待下載</p>
        </b-modal>
      </div>
    </main>
  </div>
</template>

<script>
  import StockSeeder from '../seeder/Version1Seeder'
  export default {
    name: 'electron-vue-stock',
    mounted () {
      this.$refs['load-modal'].show()
      let that = this
      StockSeeder(that.$db).then(function () {
        that.$refs['load-modal'].hide()
      })
    }
  }
</script>

<style>
  /* CSS */
</style>
