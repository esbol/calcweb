import { Panel } from './../models/panel';
import { reactive, watchEffect } from 'vue'

interface IStore {
    panels: Array<Panel>
    selectedPanel: Panel | null,
    selectedObject: any | null
}
export const store: IStore = reactive({
    panels: [],
    selectedPanel: null,
    selectedObject: null,

})

watchEffect(()=>{
    if(store.selectedPanel){
        store.selectedObject = null
    }
    
})
watchEffect(() => {
    if (store.selectedObject) {
        //console.log(store.selectedObject);
        
    }

})