<template>
<div class="loading">
  <div class="spinner-wrap">
    <van-loading type="spinner" color="white" size="30px" />
    <div>加载中</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss">
.loading{
  position:fixed;
  width:100%;
  height:100%;
  left:0;
  top:0;
  z-index:9999;
  .van-loading {
    width:80px!important;
    height:80px!important;
    margin-bottom:15px;
  }
  .spinner-wrap {
    width:170px;
    height:170px;
    background:rgba(0,0,0,.7);
    border-radius: 10px;
    position: absolute;
    left:50%;
    top:50%;
    margin-top:-85px;
    margin-left:-85px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:#fff;
    font-size:28px;
  }
}
</style>
