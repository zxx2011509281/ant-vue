<template>
  <Bac>
    <div class="container">
      <div
        class="introduce"
      >互动宝宝作为人民日报“百城书香·阅读校园”活动唯一合作方，通过搭建灵活便捷的智能图书馆，帮助孩子享受阅读的乐趣，建立良好的阅读习惯、提高阅读能力，为孩子的未来奠定坚实的基础。</div>
      <div class="introduce">快来参与阅读测评，找到孩子适合读的书 ！</div>

      <div class="edit-box">
        <div class="title">{{userInfo.schoolName}}幼儿园邀请您来测评</div>
        <div class="join c">已经有{{userInfo.cpNum}}个小朋友参加</div>
        <div class="line">
          <div class="left">宝贝姓名</div>
          <div class="right">
            <input type="text" v-model.trim="childName" @change="changeFn" />
          </div>
        </div>
        <div class="line">
          <div class="left">宝贝姓名</div>
          <div class="right">
            <span @click="changeRadio('male')" :class="[sex=='male' ? 'active': '', 'radio' ]">男</span>
            <span @click="changeRadio('female')" :class="[sex=='male' ? '': 'active', 'radio' ]">女</span>
          </div>
        </div>
        <div class="line">
          <div class="left">宝贝生日</div>
          <div class="right">
            <div @click="showBirthFn" class="birthday">{{birthday}}</div>
          </div>
        </div>
        <div class="shouming c">只支持0-6岁小朋友参与测评</div>
      </div>
      <div class="btn-box">
        <div :class="['btn', canNext? 'active': '']" @click="beginFn(canNext)">开始测评</div>
      </div>
      <van-datetime-picker
        class="date-picker"
        v-if="showBirth"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="chooseFn"
        @cancel="cancelFn"
      />
    </div>
  </Bac>
</template>

<script>
import { mapState } from "vuex";
import Bac from "../components/bac";
export default {
  name: "home",
  components: { Bac },
  data() {
    return {
      showBirth: false,
      sex: "male",
      minDate: new Date("2013/01/01"),
      maxDate: new Date(),
      currentDate: "",
      birthday: "",
      childName: "",
      canNext: false
    };
  },
  methods: {
    changeRadio(i) {
      this.sex = i;
    },
    showBirthFn() {
      this.showBirth = true;
    },
    chooseFn(e) {
      const date = new Date(e);
      const month =
        +date.getMonth() + 1 > 9
          ? +date.getMonth() + 1
          : "0" + (+date.getMonth() + 1);
      const dates =
        +date.getDate() > 9 ? +date.getDate() + 1 : "0" + (+date.getDate() + 1);
      this.birthday = date.getFullYear() + "-" + month + "-" + dates;
      this.showBirth = false;
      this.canNext = this.childName && this.birthday;
    },
    cancelFn() {
      this.showBirth = false;
    },
    changeFn() {
      this.canNext = this.childName && this.birthday;
    },
    beginFn(flag) {
      if (!flag) return;
      this.$store.commit("saveInput", {
        childName: this.childName,
        sex: this.sex,
        birthday: this.birthday
      });
      this.$router.push({ path: "/do" });
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style lang="scss" scoped>
.container {
  text-align: center;
}

.introduce {
  display: inline-block;
  width: 662px;
  font-size: 28px;
  color: #fff;
  text-align: left;
}

.edit-box {
  text-align: left;
  margin: 65px auto;
  background-color: #fff;
  border-radius: 26px;
  width: 686px;
  min-height: 578px;
  box-sizing: border-box;
  padding: 52px 50px 32px 50px;
  .title {
    text-align: center;
    font-size: 40px;
    color: #464646;
    font-weight: 700;
  }
  .join {
    font-size: 24px;
    color: #464646;
    margin-top: 8px;
    margin-bottom: 20px;
  }
}

.line {
  position: relative;
  margin-top: 36px;
  display: flex;
  font-size: 32px;
  height: 70px;
  align-items: center;
  .left {
    margin-right: 34px;
    color: #464646;
  }
  .right {
    input {
      width: 380px;
      height: 70px;
      outline-color: invert;
      outline-style: none;
      outline-width: 0px;
      border: none;
      border-style: none;
      text-shadow: none;
      -webkit-appearance: none;
      -webkit-user-select: text;
      outline-color: transparent;
      box-shadow: none;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      padding-left: 20px;
      outline: none;
      &:focus {
        border: 4px solid #ffbd35;
      }
    }
    .radio {
      display: inline-block;
      position: relative;
      margin-left: 108px;
      background-color: #fff;
      border: none;
      &::before {
        content: "";
        position: absolute;
        left: -64px;
        top: 0;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 1px solid #f5f5f5;
        background-color: #e0e0e0;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: -64px;
          top: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #e0e0e0;
        }
        &::after {
          content: "";
          position: absolute;
          left: -58px;
          top: 6px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #ffbd35;
        }
      }
    }
    .birthday {
      position: relative;
      width: 380px;
      height: 70px;
      line-height: 70px;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      padding-left: 20px;
      &::after {
        content: "";
        position: absolute;
        top: 16px;
        right: 16px;
        width: 38px;
        height: 38px;
        background: url("../assets/img/time.png") center/100% no-repeat;
        color: #464646;
        font-size: 32px;
      }
    }
  }
}
.date-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
.shouming {
  color: #979797;
  font-size: 24px;
  margin-top: 40px;
}
.btn-box {
  margin: 54px 0 36px 0;

  text-align: center;
  height: 104px;
  .btn {
    display: inline-block;
    width: 542px;
    height: 104px;
    line-height: 104px;
    text-align: center;
    background-color: #dddddd;
    color: #fff;
    font-size: 36px;
    border-radius: 64px;
    &.active {
      background-color: #ffbd35;
      color: #012530;
    }
  }
}
// .wt3 {
//   width: 686px;
//   height: 221.5px;
// }
// .wt4 {
//   width: 750px;
//   height: 682px;
// }
</style>
