import axios from "axios";
const catalogue = {
  namespaced: true,
  state:{
    // 存储分类数组属性
    catalogueList: [],
    // 当前激活分类
    currentCatalogue:''
  },
  mutations:{
    updateCatalogue(state, payload){
      state.catalogueList = payload
    },
    updataCurrentCatalogue(state, payload){
      state.currentCatalogue = payload
    }
  },
  actions:{
    async getCatalogue(context){
     let res = await axios.get('http://ttapi.research.itcast.cn/app/v1_0/channels')
      // 需要通过mutation 才能改数据
      context.commit('updateCatalogue',res.data)
      console.log(res);
    }
  }
}
export default catalogue
