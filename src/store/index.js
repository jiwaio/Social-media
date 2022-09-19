import Vue from 'vue'
import Vuex from 'vuex'
import catalogue from '@/store/modules/catalogue'
import newlist from '@/store/modules/newlist'
import { getItem,setItem } from "@/utils/storage";

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    //存储当前登陆用户的信息
    user:getItem(TOKEN_KEY),
  },
  mutations: {
    setUser(state,data){
      state.user = data
      //为了防止刷新丢失，将用户备份到本地存储
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {},
  modules: {
    catalogue,
    newlist
  },
  getters: {
    // 建立子模块的快捷访问
    catalogueList: state => state.catalogue.catalogueList,
    currentCatalogue: state => state.catalogue.currentCatalogue
  }
})
