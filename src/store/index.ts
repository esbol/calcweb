import { Panel } from '@/models/panel'
import { Format } from '@/models/settings/format'
import Flatted, { parse, stringify, toJSON, fromJSON } from 'flatted';
import { createStore, Module } from 'vuex'
import { plainToClass, classToPlain, Exclude, Expose, Transform } from 'class-transformer';
import { getJSON } from '@/models/serialize/serialize';
import { getPanels } from '@/models/serialize/deserialize';


export interface IState {
  panels: Array<Panel>
  selectedPanel: Panel | null
  selectedObject: any | null
  showPopup: any
  showGrid: boolean

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
    },
    showGrid: false
  },
  getters: {
  },
  mutations: {
    setPanels(state, panels: Array<Panel>) {
      state.panels = panels
      state.selectedPanel = panels[0]
      
      
    },
    addPanel(state, panel: Panel) {
      state.panels.push(panel)
      console.log(panel);
    }
  },
  actions: {
    fetchPanels({ commit }) {
      const panelsJSON = localStorage.getItem('panels');
      if (panelsJSON) {
        const deserialized = getPanels(panelsJSON)
        commit('setPanels', deserialized);
      }
    },
    savePanels({ state }) {
      const panelsJSON = getJSON(state.panels)
      localStorage.removeItem('panels')
      localStorage.setItem('panels', panelsJSON);
    },
  },
  modules: {
  }
})

