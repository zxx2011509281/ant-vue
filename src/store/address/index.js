
// ...mapGetters('address', ['getAddrList'])
//  import { mapGetters } from "vuex";

const state = {
  // 地址列表页，选择地址后更新此属性
  // 编辑地址页，提交之后更新此属性
  // 添加地址页，提交之后更新此属性
  defaultMemberAddr: {},
  // 地址列表页获取到的地址列表
  addrList: {},
  checkAddr:{}
};
const getters = {
  getMemberAddr(state) {
    return state.checkAddr.addrId ? state.checkAddr : state.defaultMemberAddr;
  },
  getAddrList(state){
    return state.addrList
  }
}
const mutations = {
  setDefaultAddress(state, payload) {
    state.defaultMemberAddr = payload;
  },
  setCheckAddress(state, payload){
    state.checkAddr = payload;
  },
  resetCheckMemberAddr(state) {
    state.defaultMemberAddr = {}
  },
  setAddrList(state, payload) {
    state.addrList = payload;
  },
  updateheckAddr(state, payload) {
    Object.assign(state.checkAddr, payload);
  }
};

const actions = {
  disSetDefaultAddress({ commit }, reqData = {}) {
    commit("setDefaultAddress", reqData);
  },
  disResetCheckMemberAddr({ commit }) {
    commit("resetCheckMemberAddr");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
