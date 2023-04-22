import { IState } from "@/store";
import { Contact } from "../contact";
import { Device } from "../device";
import { SectionLine } from "../sectionline";
import { useStore } from "vuex";
import { CommutateApparate } from "../commutateApparate";
import { Panel } from "../panel";

export function getJSON(panels1: Array<Panel>){
    panels = panels1
    console.log(panels);
    
    setElements()
    setJSONs()
    return {
        jsonDevices: jsonDevices,
        jsonSections: jsonSections,
        jsonContacts: jsonContacts
    }
}

let panels = new Array<Panel>()

const devices: Array<Device> = []
const sections: Array<SectionLine> = []
const contacts: Array<Contact> = []

const jsonDevices: Array<string> = []
const jsonSections: Array<string> = []
const jsonContacts: Array<string> = []

function setElements(){
    panels.forEach(p=>{
        const devs = p.uniteSection.subDevices
        devs.forEach(d=>{
            if(!devices.includes(d)) devices.push(d)
        })
    })
    panels.forEach(p=>{
        const sects = p.uniteSection.subSections
        sects.forEach(s=>{
            if(!sections.includes(s)) sections.push(s)
        })
    })
    devices.forEach(d=>{
        if(!contacts.includes(d.inContact)) contacts.push(d.inContact)
        if(d instanceof CommutateApparate){
            const com = d as CommutateApparate
            if(!contacts.includes(com.outContact)) contacts.push(com.outContact)
        }
    })
    console.log(panels);
    
}
function setJSONs(){
    devices.forEach(d => {
        const devJSON = JSON.stringify(d)
        jsonDevices.push(devJSON)
    })
    
    sections.forEach(s => {
        const secJSON = JSON.stringify(s)
        jsonSections.push(secJSON)
    })
    
    contacts.forEach(c => {
        const contJSON = JSON.stringify(c)
        jsonContacts.push(contJSON)
    })
}

