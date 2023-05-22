import { Panel } from '@/models/panel'
import { Format } from '@/models/settings/format'
import Flatted, { parse, stringify, toJSON, fromJSON } from 'flatted';
import { createStore, Module, Store, useStore } from 'vuex'
import { plainToClass, classToPlain, Exclude, Expose, Transform } from 'class-transformer';
import { getJSON } from '@/models/serialize/serialize';
import { getPanels } from '@/models/serialize/deserialize';



export interface IState {
  panels: Array<Panel>
  selectedPanel: Panel | null
  selectedObject: any | null
  showPopup: any
  showGrid: boolean
  isModePrint: boolean
  selectedProject: IProject | null
  projects: Array<IProject>

}
export interface IProject {
  id: number,
  name: string,
  panels: Array<Panel>
}


export default createStore<IState>({
  state: {
    projects: [],
    selectedProject: null,
    panels: [],
    selectedPanel: null,
    selectedObject: null,
    isModePrint: false,
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
    calcPanels(state) {
      state.panels.forEach(p => p.calc())
    },
    setPanels(state, panels: Array<Panel>) {
      state.panels = panels
      state.selectedPanel = panels[0]
      //console.log(panels);

     // panels.forEach(p => p.calc())

    },
    addPanel(state, panel: Panel) {
      state.panels.push(panel)
      console.log(panel);
    }
  },
  actions: {
   
    fetchPanels({ commit }) {
      const panelsJSON = localStorage.getItem('panels');
      
      // if (panelsJSON) {
      //   try {
      //     const deserialized = getPanels(panelsJSON)
      //     if(deserialized.length > 0)
      //     commit('setPanels', deserialized);
      //   } catch (error) {
      //     console.log(error);
          
      //   }

      // }
    },
    savePanels({ state }) {
      // const panelsJSON = getJSON(state.panels)
      // localStorage.removeItem('panels')
      // localStorage.setItem('panels', panelsJSON);
    },
  },
  modules: {
  }
})

