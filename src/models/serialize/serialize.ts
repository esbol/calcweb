import { IState } from "@/store";
import { Contact } from "../contact";
import { Device } from "../device";
import { SectionLine } from "../sectionline";
import { useStore } from "vuex";

const store = useStore().state as IState
const devices: Array<Device> = []
const sections: Array<SectionLine> = []
const contacts: Array<Contact> = []
const cables: Array<Device> = []
const pipes: Array<Device> = []

function setElements(){
    store.panels.forEach(p=>{
        const devs = p.uniteSection.subDevices
        devs.forEach(d=>{
            if(!devices.includes(d)) devices.push(d)
        })
    })
    store.panels.forEach(p=>{
        const sects = p.uniteSection.subSections
        sects.forEach(s=>{
            if(!sections.includes(s)) sections.push(s)
        })
    })
    store.panels.forEach(p=>{
        const sects = p.uniteSection.subSections
        sects.forEach(s=>{
            if(!sections.includes(s)) sections.push(s)
        })
    })
}
