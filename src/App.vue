<template>

  <div id="app">
    <loading v-show="requestLoading"/>
    <router-view/>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue'
import { mapState } from 'vuex'
// import { setTimeout } from 'timers'
// import { login } from './request/api'
export default {
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  async created () {
    // if(process.env.NODE_ENV === 'production') {
    //   this.$router.replace({name: 'start'})
    //   login().catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  computed: {
    ...mapState([
      'requestLoading'
    ])
  },
  mounted () {
  }
}
</script>
<style lang="scss">
html,body {
  height:100%;
}
#app {
  height:100%;
}
.mint-toast {
  border-radius: 20px!important;
  padding:30px 48px!important;
  max-width:464px!important;
  line-height:48px;
}
.mint-toast-text {
  font-size:26px!important;
}


</style>
