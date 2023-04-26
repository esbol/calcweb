import { IState } from "@/store";
import { Contact } from "../contact";
import { Device } from "../device";
import { SectionLine } from "../sectionline";
import { useStore } from "vuex";
import { CommutateApparate } from "../commutateApparate";
import { Panel } from "../panel";
import { Consumer } from "../consumer";
import { Cable } from "../cable";
import { Pipe } from "../pipe";




export function getJSON(panels1: Array<Panel>){
    panels = panels1

    
    setElements()
    setJSONs()
    
    return JSON.stringify({
        jsonDevices: jsonDevices,
        jsonSections: jsonSections,
        jsonContacts: jsonContacts,
        jsonCables: jsonCables,
        jsonPipes: jsonPipes
    })
   
    
}

let panels = new Array<Panel>()

const devices: Array<Device> = []
const sections: Array<SectionLine> = []
const contacts: Array<Contact> = []
const cables: Array<Cable> = []
const pipes: Array<Pipe> = []

const jsonDevices: Array<string> = []
const jsonSections: Array<string> = []
const jsonContacts: Array<string> = []
const jsonCables: Array<string> = []
const jsonPipes: Array<string> = []

function setElements(){
    panels.forEach(p=>{
        const devs = p.s1Section.subDevices
        devs.forEach(d=>{
            if(!devices.includes(d)) devices.push(d)
        })
    })
    panels.forEach(p=>{
        sections.push(p.s1Section)
        const sects = p.s1Section.subSections
        sects.forEach(s=>{
            if(!sections.includes(s)){
                sections.push(s)
                if(!cables.includes(s.cable)) cables.push(s.cable)
                if(!pipes.includes(s.pipe)) pipes.push(s.pipe)
            } 
        })
    })
    sections.forEach(s=>{
        if(s.startContact != null)
        if(!contacts.includes(s.startContact)) contacts.push(s.startContact)
        if(s.endContact != null)
        if(!contacts.includes(s.endContact)) contacts.push(s.endContact)
        
    })
   
   
    
}
function setJSONs(){
    devices.forEach(c => {
        const devJSON = JSON.stringify(c)
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

    cables.forEach(cab=>{
        const cabJSON = JSON.stringify(cab)
        jsonCables.push(cabJSON)
    })

    pipes.forEach(pip=>{
        const pipJSON = JSON.stringify(pip)
        jsonPipes.push(pipJSON)
    })
}

