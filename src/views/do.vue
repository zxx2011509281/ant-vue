<template>
  <div class="container">
    <div class="box">
      <div v-if="edting">
        <div class="t1">
          <span class="cur">{{cur}}</span>
          <span class="all">/{{this.ti.length}}</span>
        </div>
        <div class="t2">{{this.ti[cur-1].topic}}</div>
        <div class="pre-next">
          <div @click="preFn" :class="[cur == 1 ? 'pre_g' : 'pre']"></div>
          <div @click="nextFn" :class="[cur == this.ti.length ? 'next_g' : 'next']"></div>
        </div>
        <div class="choose-box">
          <div
            @click="chooseFn(cur-1, 0)"
            :class="['btn',this.ans[cur-1] == 0 ? 'active': '']"
          >{{this.ti[cur-1] && this.ti[cur-1].answerList &&  this.ti[cur-1].answerList[0].answer}}</div>
          <div
            @click="chooseFn(cur-1, 1)"
            :class="['btn',this.ans[cur-1] == 1 ? 'active': '']"
          >{{this.ti[cur-1] && this.ti[cur-1].answerList && this.ti[cur-1].answerList[1].answer}}</div>
          <div
            @click="chooseFn(cur-1, 2)"
            :class="['btn', this.ans[cur-1] == 2 ? 'active': '']"
          >{{this.ti[cur-1] && this.ti[cur-1].answerList && this.ti[cur-1].answerList[2].answer}}</div>
        </div>
      </div>
      <div class="no-editing" v-else>
        <img src="../assets/img/ji.png" alt />
        <div class="text">感谢您完成测评题目，提交后互动宝宝将为您生成推荐图书。</div>
        <div class="btn1" @click="submit">提交</div>
        <div class="btn2" @click="backFn">返回修改</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import wx from 'weixin-js-sdk'
import { submit } from "@/request/api";
export default {
  name: "do",
  props: [],
  components: {},
  filters: {},
  data() {
    return {
      cur: 1,
      pre: "pre_g",
      next: "next_g",
      edting: true,
      list: [],
      ans: [],
      canTap: true
    };
  },
  created: function() {
    this.$store.dispatch("getTi", { birthday: this.inputObj.birthday });
  },
  methods: {
    preFn() {
      if (this.cur == 1) return;
      this.cur--;
    },
    nextFn() {
      if (this.cur >= this.ti.length) return;
      if (!this.list[this.cur - 1]) return;
      this.cur++;
    },
    chooseFn(i, key) {
      if (!this.canTap) return;
      this.canTap = false;
      const obj = this.ti[i];
      const item = {
        score: obj.answerList[key].score,
        answer: obj.answerList[key].answer,
        category: obj.category+'',
        assessId: obj.id
      };
      this.list[i] = item;

      this.$set(this.ans, i, key);
      if (i >= this.ti.length - 1) {
        this.edting = false;
        this.canTap = true;
      } else {
        setTimeout(() => {
          this.cur++;
          this.canTap = true;
        }, 200);
      }
    },
    backFn() {
      this.edting = true;
    },
    submit() {
      for (var i = 0; i < this.ti.length; i++) {
        if (!this.list[i]) return alert("您还有评测未做");
      }
      const { childName, sex, birthday } = this.inputObj;
      const {
        openid: openId,
        nickname: nickName,
        headimgurl: headUrl
      } = this.userInfo;
      const req = {
        childName,
        sex,
        birthday,
        openId,
        eduId: this.eduId,
        nickName,
        headUrl,
        isNew: this.isFirst ? 0 : 1, 
        list: this.list
      };
      submit(req).then(res => {
        const data = res.data;
        this.$store.commit('saveResult', data)
        this.$router.push({path: 'result'})
      });
    }
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo", "ti", "inputObj", "eduId", 'isFirst'])
  },
  beforeDestroy() {}
};
</script>
<style lang='scss' scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f4f4f4;
  .box {
    position: fixed;
    top: 22px;
    right: 32px;
    bottom: 22px;
    left: 32px;
    background-color: #fff;
    border-radius: 24px;
    .t1 {
      height: 144px;
      border-bottom: 2px solid #f4f4f4;
      padding-left: 56px;
      line-height: 144px;
      .cur {
        color: #ffce02;
        font-size: 72px;
      }
      .all {
        color: #979797;
        font-size: 24px;
      }
    }
    .t2 {
      margin-top: 30px;
      padding: 0 56px;
      color: #464646;
      font-size: 32px;
      line-height: 48px;
    }
    .pre-next {
      position: absolute;
      bottom: 580px;
      padding: 0 38px;
      height: 80px;
      width: 690px;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      div {
        display: inline-block;
        width: 80px;
        height: 80px;
        &.pre_g {
          background: url("../assets/img/pre_g.png") center/100% no-repeat;
        }
        &.next_g {
          background: url("../assets/img/next_g.png") center/100% no-repeat;
        }
        &.pre {
          background: url("../assets/img/pre.png") center/50% no-repeat;
        }
        &.next {
          background: url("../assets/img/next.png") center/50% no-repeat;
        }
      }
    }
    .choose-box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 442px;
      border-top: 2px solid #f4f4f4;
      padding: 38px 100px 44px 100px;
      .btn {
        display: inline-block;
        background-color: #f4f4f4;
        border: 2px solid #ffee80;
        width: 486px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 32px;
        color: #464646;
        border-radius: 48px;
        margin: 16px 0;
        &.active {
          background-color: #ffce02;
          color: #fff;
        }
      }
    }
  }
  .no-editing {
    img {
      width: 220px;
      height: 220px;
      position: absolute;
      top: 162px;
      left: 234px;
    }
    .text {
      position: absolute;
      top: 442px;
      left: 102px;
      right: 102px;
      font-size: 32px;
      line-height: 48px;
      color: #464646;
    }
    .btn1 {
      position: absolute;
      left: 100px;
      bottom: 180px;
      border: 2px solid #ffee80;
      width: 486px;
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 32px;
      border-radius: 48px;
      margin: 16px 0;
      background-color: #ffce02;
      color: #fff;
    }
    .btn2 {
      position: absolute;
      left: 100px;
      bottom: 60px;
      background-color: #f4f4f4;
      border: 2px solid #ffee80;
      width: 486px;
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 32px;
      color: #464646;
      border-radius: 48px;
      margin: 16px 0;
    }
  }
}
</style>
