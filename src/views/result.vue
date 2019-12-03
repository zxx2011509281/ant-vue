<template>
  <div class="bac">
    <div class="box">
      <img src="../assets/img/r.png" alt="">
      <div class="txt">适合宝贝的图书已经生成 快去看看吧！</div>
      <div class='btn' @click="toResult">获取测评结果</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: [],
  components: {},
  filters: {},
  data() {
    return {};
  },
  created: function() {},
  methods: {
    toResult(){
      this.$router.push({path: '/appraisaled', query: {isPerson: true}})
    }
  },
  mounted() {},
  computed: {},
  beforeDestroy() {}
};
</script>
<style lang='scss' scoped>
.bac {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #c9c9c9;
  .box{
    position: absolute;
    width: 546px;
    height: 740px;
    left: 50%;
    top:45%;
    transform: translate(-50%, -50%);
    // top: 150px;
    // left: 102px;
    box-shadow:0px 6px 12px rgba(152,152,152,0.1);
    background-color: #fff;
    border-radius: 12px;
    img{
      width: 217px;height: 217px;
      position: absolute;
      top: 124px;left: 166px;
    }
    .txt{
      color: #979797;
      font-size: 32px;
      position: absolute;
      top: 400px;
      left: 98px;
      right: 96px;
      text-align: center;
      line-height:48px;
    }
    .btn{
      position: absolute;
      bottom: 54px;
      left: 82px;
      width: 382px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      background-color: #FFDE02;
      border-radius: 48px;
      color: #464646;
      font-size: 36px;
      font-weight: 700px;
    }
  }
}
</style>
