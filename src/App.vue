<template>
  <div id="app">
    <!-- <Header v-if="(path === '/RetrieveName'  || path === '/Detail' || path === '/RetrieveInst' || path === '/RetrieveField' || path ==='/OrgHome' || path ==='/Overview' || path ==='/Analysis' || path ==='/Scholar' || path ==='/Trend' || path ==='/Keyword' || path === '/Periodical' )"> </Header> -->
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      path: ''
    }
  },
  mounted () {
    this.path = this.$route.path
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    }
  }
}
</script>
