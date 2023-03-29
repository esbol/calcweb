import { Panel } from '@/models/panel'
import { Format } from '@/models/settings/format'
import Flatted, { parse, stringify, toJSON, fromJSON } from 'flatted';
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
    setPanels(state, panels: Array<Panel>) {
      console.log(panels[0] instanceof Panel);
      console.log(panels[0]);
      
      state.panels.splice(0, state.panels.length);

      panels.forEach(p => {
        state.panels.push(p)

      })

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
        const panels: Array<Panel> = parse(panelsJSON)
        commit('setPanels', panels);
        console.log(panels);

      }
    },
    savePanels({ state }) {

      const panelsJSON = stringify(state.panels);
      localStorage.setItem('panels', panelsJSON);
      console.log(state.panels);

      // const pans = localStorage.getItem('panels');
      // if (pans) {
      //   const panels: Array<Panel> = parse(pans);
      //   console.log(panels);

      // }
    },
  },
  modules: {
  }
})
