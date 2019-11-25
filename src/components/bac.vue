<template>
  <div class="home">
    <div class="top">
      <img class="wt1" src="../assets/img/wt1.png" alt />
      <img class="wt2" src="../assets//img/wt2.png" alt />
    </div>
    <slot></slot>
    <div class="wt3" @click='toschoolResultFn'>
      <span>查看{{userInfo.schoolName}}幼儿园 小朋友想读的绘本</span>
    </div>
    <slot name="book"></slot>
    <img class="wt4" src="../assets/img/wt4.png" alt />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "bac",
  computed: {
    ...mapState(
      ['eduId', 'userInfo']
    )
  },
  methods:{
    toschoolResultFn(){
      this.$router.push({path: '/schoolResult', query:{id: this.eduId}})
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #012531;
  display: inline-block;
  width: 750px;
  padding-top: 34px;
  text-align: center;
}
img {
  font-size: 0;
}
.top {
  margin-bottom: 64px;
  height: 370px;
  position: relative;
}
.wt1 {
  width: 670px;
  height: 194px;
}
.wt2 {
  position: absolute;
  width: 686px;
  height: 296px;
  top: 70px;
  left: 32px;
}
.wt3 {
  position: relative;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 686px;
  height: 221.5px;
  background: url(../assets/img/wt3.png) center/100% no-repeat;
  box-sizing: border-box;
  padding: 0 200px 0 215px;
  font-size: 30px;
  color: #fff;
}
.wt4 {
  width: 750px;
  height: 682px;
}
</style>
