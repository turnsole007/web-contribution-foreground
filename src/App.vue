<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
      <Navigator></Navigator>
      <router-view />
      <!-- <Footer></Footer> -->
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Navigator from './components/Navigator'
// import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Navigator
    // Footer
  }
}
</script>
