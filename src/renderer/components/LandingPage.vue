<template>
  <div id="wrapper" class="container-fluid">
    <main>
      <div class="row">
        <div class="col">
          <h1>更新履歷</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>v0.0.1 新增收盤走勢圖</h3>
          <h3>v0.0.2 新增完整名稱查詢</h3>
          <h3>v0.0.3 增加即時看盤</h3>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    components: { },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>
