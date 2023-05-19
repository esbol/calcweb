<template>
    <button @click="setJSON">
        <div class="text">Экспорт в JSON</div>
    </button>
    <div class="tools_container no-select">

        <div class="tools-row">

            <button class="btn" @click="print">
                <div class="text">Экспорт в PDF</div><img src="@/assets/pdf.svg" alt="" class="pdf">
            </button>
            <button class="btn" @click="savePanelsToFile">
                <div class="text">Экспорт в DWG</div><img src="@/assets/dwg.png" alt="" class="dwg">
            </button>

        </div>

    </div>
</template>

<script setup lang="ts">
import FormatProps from './FormatProps.vue';

import { useStore } from 'vuex';
import { computed, ref, watchEffect } from 'vue';
import { IState } from '@/store';
import { getJSON } from '@/models/serialize/serialize';
import { Panel } from '@/models/panel';
import { Contact } from '@/models/contact';


const state = useStore().state as IState
const store = useStore()
const color = computed(() => {
    if (state.showGrid) {
        return 'var(--main-text-color)'
    } else {
        return 'gray'
    }
})

class HasId {
    id: number = Math.random()
    constructor() { }

}


class Test extends HasId {
    test: Test | null = null
    name: string = 'name'
    sections: Array<Test> = []
    type: string = this.constructor.name
    constructor() {
        super()
    }

}
const allObjects: Array<HasId> = []
const allReplacedObjects: Array<HasId> = []
const allObjectsString: Array<string> = []
function setJSON() {


    const t = new Test()
    const t1 = new Test()
    const t2 = new Test()
    const t3 = new Test()
    const t4 = new Test()
    const t5 = new Test()
    t.name = 'Name'
    t.sections.push(t4)
    t.sections.push(t5)
    t1.name = 'Name1'
    t2.name = 'Name2'
    t3.name = 'Name3'
    t.test = t1
    t1.test = t2
    t2.test = t3


    recurcySetAllObjects(t)
    console.log(allObjects);

    allObjects.forEach(o => allReplacedObjects.push(replaceObject(o) as HasId))
    console.log(allReplacedObjects);
    allObjects.forEach(o => {

        // allObjectsString.push(JSON.stringify(o, replacer))

    })

    console.log(allObjectsString);

    function recurcySetAllObjects(t: any) {
        const jsonTobj = allObjects.find(o => o.id == t.id)
        if (jsonTobj == undefined) allObjects.push(t)
        for (let key in t) {
            const k = key as keyof typeof t

            // let isArray = false
            // if (Array.isArray(t[k])) {
            //     isArray = true
            // } else {
            //     isArray = false
            // }
            // console.log(k.toString() + '-type isArray: ' + isArray);

            if (t[k] instanceof HasId) {
                const jsonObj = allObjects.find(o => o.id == t[k].id)
                if (jsonObj == undefined) {
                    allObjects.push(t[k] as HasId)
                    recurcySetAllObjects(t[k])
                }
            }else if(Array.isArray(t[k])){
                setArrayAllObjects(t[k])
            }

        }
    }

    function setArrayAllObjects(arr: Array<any>) {
        arr.forEach(element => {
            const jsonEl = allObjects.find(o => o.id == element.id)
            if (jsonEl == undefined) {
                allObjects.push(element)
                recurcySetAllObjects(element)
            }

        });
    }

    function replaceObject(object: any): object {
        let replObj = Object.assign({}, object)

        for (let key in object) {
            const k = key as keyof typeof object
            if (object[k] instanceof HasId) {

                replObj[k] = object[k].id

            }else if(Array.isArray(object[k])){
                const arr = object[k] as Array<any>
                const ids = new Array<string>()
                
                arr.forEach(obj=>{
                    if(obj instanceof HasId) ids.push(obj.id.toString())
                })
                replObj[k] = ids
            }

        }

        return replObj;
    };


}


const savePanelsToFile = () => {
    const data = getJSON(state.panels)
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'panels.json';
    link.click();

    // Освобождение памяти, используемой URL
    URL.revokeObjectURL(url);
};

const savePanels = () => {
    store.dispatch('savePanels', store.state.panels);

};


const getPanels = () => {

    store.dispatch('fetchPanels');
}


async function print() {


    state.isModePrint = true
    state.showGrid = false

    console.log('print');

}




</script>

<style scoped>
.tools_container {
    display: flex;
    width: 100%;
}

.pdf {
    height: 50px;
}

.dwg {
    height: 50px;
    padding: 7px;
}

.btn {
    border: 1px dashed var(--main-accent-color);
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    width: 100%;
    margin-left: 5px;
    cursor: pointer;
    color: var(--main-accent-color);
}



.tools-row {
    display: flex;
    justify-self: start;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
}
</style>