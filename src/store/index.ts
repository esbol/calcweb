import { createStore } from 'vuex'



export default createStore({
  state: {
    panels: [],
    selectedPanel: null,
    selectedObject: null,
    selectedObjectId: 0,
    showPopup: {
      show: false,
      x: 0,
      y: 0,
      componentIndx: 0,
      args: {}
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
