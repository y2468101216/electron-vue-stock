<template>
  <div id="wrapper" class="container-fluid">
    <main>
      hello
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
