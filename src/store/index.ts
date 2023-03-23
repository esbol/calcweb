import { Panel } from '@/models/panel'
import { Format } from '@/models/settings/format'

import { createStore, Module } from 'vuex'

export interface IState {
  panels: Array<Panel>
  selectedPanel: Panel | null
  selectedObject: any | null
  showPopup: any


}



export default createStore<IState>({
  state: {
    panels: [],
    selectedPanel: null,
    selectedObject: null,

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
