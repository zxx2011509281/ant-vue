<template>
  <div class="home">
    <div :class="!isPerson ? 'top': 'top1'">
      <img class="wt1" src="../assets/img/wt1.png" alt />
      <img v-if="!isPerson" class="wt2" src="../assets//img/wt2.png" alt />
    </div>
    <div class="container">
      <div class="box">
        <div class="top-box">
          <div :class="['name', result.sex ]">{{result.childName}}</div>
          <div class="date">{{result.birthday}}</div>
          <div class="again" @click="doAgainFn()">再测一下</div>
        </div>
        <div class="line">
          <div class="title1">偏好设置</div>
          <div class="text">{{result.advantage}}</div>
        </div>
        <div class="line">
          <div class="title2">建议阅读</div>
          <div class="text">{{result.disadvantage}}</div>
        </div>
      </div>
    </div>
    <div class="wt3" @click="toschoolResultFn">
      <span>查看{{userInfo.schoolName}}幼儿园 小朋友想读的绘本</span>
    </div>
    <div class="book-box">
      <div class="tuijian">
        推荐给{{result.childName}}的绘本
        <img src="../assets/img/book.png" />
      </div>
      <div class="books">
        <div class="p" v-for="item in result.rcList" :key="item.isbn">
          <img :src="item.bookUrl" alt />
          <div class="title">{{item.bookName}}</div>
        </div>
      </div>
    </div>
    <img class="wt4" src="../assets/img/wt4.png" alt />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryResutlt } from "@/request/api";
export default {
  name: "appraisaled",
  components: {},
  data() {
    return {
      isPerson: false,
      openid: ''
    };
  },
  created(){
    const isPerson = this.$route.query.isPerson
    const openid = this.$route.query.openid
    this.isPerson = isPerson
    this.openid = openid
    if(!isPerson){
      this.queryResutlt()
    }
  },
  methods: {
    toschoolResultFn(){
      this.$router.push({path: '/schoolResult', query:{id: this.eduId}})
    },
    doAgainFn(){
      this.$store.commit('commitIsFirst', false)
      this.$router.push({path: '/do'})
    },
    queryResutlt(){
      queryResutlt({
        openId: this.userInfo.openid || this.openid,
        eduId: this.eduId
      }).then(res => {
        const data = res.data;
        this.$store.commit('saveResult', data)
      });
    }
  },
  computed: {
    ...mapState(["userInfo", "result", 'eduId'])
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
.top1 {
  position: relative;
  font-size: 0;
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
.container {
  text-align: center;
}
.box {
  text-align: left;
  margin: 65px auto;
  background-color: #fff;
  border-radius: 26px;
  width: 686px;
  min-height: 450px;
  box-sizing: border-box;
  padding: 170px 48px 24px 64px;
  position: relative;
  .top-box {
    position: absolute;
    top: 52px;
    left: 0;
    width: 100%;
    height: 120px;
    .name {
      color: #464646;
      font-size: 32px;
      position: absolute;
      top: 0;
      left: 64px;
      font-weight: 700;
      &.male::after {
        content: "";
        position: absolute;
        width: 44px;
        height: 44px;
        right: -60px;
        top: 0;
        background: url("../assets/img/nan.png") center/100% no-repeat;
      }
      &.female::after{
        content: '';
        position: absolute;
        width: 44px;
        height: 44px;
        right: -60px;
        top: 0;
        background: url('../assets/img/nv.png') center/100% no-repeat;
      }
    }
    .date {
      position: absolute;
      left: 64px;
      top: 48px;
      font-size: 24px;
      color: #979797;
    }
    .again {
      position: absolute;
      right: 76px;
      top: 6px;
      font-size: 24px;
      color: #979797;
      &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        right: -28px;
        top: 6px;
        background: url("../assets/img/icon-right.png") center/100% no-repeat;
      }
    }
  }
  .line {
    margin-bottom: 36px;
    .title1 {
      color: #ed6f00;
      font-size: 32px;
      margin-bottom: 6px;
    }
    .title2 {
      color: #648ff0;
      font-size: 32px;
      margin-bottom: 6px;
    }
    .text {
      font-size: 28px;
      color: #979797;
    }
  }
}
.book-box {
  .tuijian {
    font-size: 36px;
    color: #fff;
    position: relative;
    text-align: left;
    padding-left: 32px;
    margin-top: 68px;
    margin-bottom: 34px;
    img {
      width: 64px;
      height: 64px;
      position: relative;
      top: 20px;
    }
  }
  .books {
    padding: 0 58px 0 66px;
    text-align: left;
    .p {
      display: inline-block;
      height: 347px;
      width: 200px;
      margin-right: 8px;
      .title {
        font-size: 28px;
        color: #ffffff;
        text-align: center;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 100%;
        height: 262px;
      }
    }
  }
}
</style>
