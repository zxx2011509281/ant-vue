<template>
  <div class="home">
    <div class="top">
      <img class="wt1" src="../assets/img/wt1.png" alt />
    </div>
    <div class="container">
      <div class="schoolName">{{res.schoolName}}</div>
      <div class="cpNum">已经有{{res.testChildNum}}个小朋友参加</div>
      <div class="child-name">
        <div class="item" v-for="item in res.childNameList.slice(0,9)" :key="item">{{item}}</div>
        <div class="item2" v-if="res.childNameList.length >= 9">......</div>
      </div>
    </div>

    <div class="book-box">
      <div class="tuijian">
        推荐给{{userInfo.nickname}}的绘本
        <img src="../assets/img/book.png" />
      </div>
      <div class="books">
        <div class="p"  v-for="item in res.rcList" :key="item.isbn">        
          <img :src="item.bookUrl" alt />
          <div class="title">{{item.bookName}}</div>
        </div>
      </div>
    </div>
    <img class="wt4" src="../assets/img/wt4.png" alt />
  </div>
</template>

<script>
import { queryResutltSchool } from "@/request/api";
import { mapState } from "vuex";
export default {
  name: "appraisaled",
  components: {},
  data() {
    return {
      isPerson: false,
      sex: "male",
      res: {
        schoolName: '',
        testChildNum: 0,
        childNameList: [],
        rcList: [
       
      ]
      }
    };
  },
  created(){
this.queryResutltSchool()
  },
  methods: {
    queryResutltSchool(){
      queryResutltSchool({
        openId: this.userInfo.openid,
        eduId: this.eduId
      }).then(res => {
        this.res = res.data
      });
    }
  },
  computed: {
    ...mapState(["userInfo"])
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

.wt4 {
  width: 750px;
  height: 682px;
}
.container {
  text-align: center;
  .schoolName {
    color: #fff;
    font-size: 52px;
    margin-top: 42px;
    margin-bottom: 16px;
  }
  .cpNum {
    color: #fff;
    font-size: 32px;
    margin-bottom: 38px;
  }
  .child-name {
    padding: 0 16px 0 32px;
    text-align: left;
    height: 152px;
    box-sizing: border-box;
    overflow: hidden;
    .item {
      display: inline-block;
      background-color: #ffbd35;
      font-size: 28px;
      color: #fff;
      border-radius: 12px;
      text-align: center;
      width: 124px;
      height: 64px;
      line-height: 64px;
      // padding: 0 20px;
      text-align: center;
      margin-right: 16px;
    }
    .item2 {
      display: inline-block;
      font-size: 28px;
      color: #fff;
      border-radius: 12px;
      text-align: center;
      height: 64px;
      line-height: 64px;
      padding: 0 20px;
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
