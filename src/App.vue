<template>
  <div id="app">
    <loading v-show="requestLoading" />
    <router-view />
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      code: "",
      state: ""
    };
  },
  components: {
    Loading
  },
  async created() {
    this.code = this.$getQueryString("code");
    this.state = this.$getQueryString("state");
  },
  computed: {
    ...mapState(["requestLoading"])
  },
  mounted() {
    this.code = this.$getQueryString("code") || "";
    const state = this.$getQueryString("state").split("_");
    this.state = state[0];
    state[1] ? this.getUserInfo() : this.getUserInfo2();
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch("getUserInfo", {
        code: this.code,
        state: this.state
      });
    },
    getUserInfo2() {
      this.$store.dispatch("getUserInfo2", {
        code: this.code,
        state: this.state
      });
    }
  }
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
.c {
  text-align: center;
}
.l {
  text-align: left;
}
</style>
