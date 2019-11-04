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
    </main>
  </div>
</template>

<script>
  export default {
    name: 'electron-vue-shock'
  }
</script>

<style>
  /* CSS */
</style>
