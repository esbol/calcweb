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
import { Breakers } from "../bd/breakers";
import { BreakersPower } from "../bd/breakersPower";
import { Cables } from "../bd/cables";
import { Contactors } from "../bd/contactors";
import { DiffBreakers } from "../bd/diffbreakers";
import { Fuses } from "../bd/fuses";
import { Pipes } from "../bd/pipes";


let panels = new Array<Panel>()

export function getJSON(panels1: Array<Panel>) {
    panels = panels1



    setElements()
    setJSONs()

    return JSON.stringify({
        jsonBDBreakers: jsonBDBreakers,
        jsonBDBreakersPower: jsonBDBreakersPower,
        jsonBDCables: jsonBDCables,
        jsonBDContactors: jsonBDContactors,
        jsonBDDiffBreakers: jsonBDDiffBreakers,
        jsonBDFuses: jsonBDFuses,
        jsonBDPipes: jsonBDPipes,
        jsonDevices: jsonDevices,
        jsonSections: jsonSections,
        jsonContacts: jsonContacts,
        jsonCables: jsonCables,
        jsonPipes: jsonPipes
    })


}

let jsonBDBreakers: Array<string> = []
let jsonBDBreakersPower: Array<string> = []
let jsonBDCables: Array<string> = []
let jsonBDContactors: Array<string> = []
let jsonBDDiffBreakers: Array<string> = []
let jsonBDFuses: Array<string> = []
let jsonBDPipes: Array<string> = []

let devices: Array<Device> = []
let sections: Array<SectionLine> = []
let contacts: Array<Contact> = []
let cables: Array<Cable> = []
let pipes: Array<Pipe> = []

let jsonDevices: Array<string> = []
let jsonSections: Array<string> = []
let jsonContacts: Array<string> = []
let jsonCables: Array<string> = []
let jsonPipes: Array<string> = []

function setElements() {

    devices = []
    sections = []
    contacts = []
    cables = []
    pipes = []

    jsonDevices = []
    jsonSections = []
    jsonContacts = []
    jsonCables = []
    jsonPipes = []

    panels.forEach(p => {
        const devs = p.s1Section.subDevices
        devs.forEach(d => {
            if (!devices.includes(d)) devices.push(d)
        })
    })
    panels.forEach(p => {
        sections.push(p.s1Section)
        const sects = p.s1Section.subSections
        sects.forEach(s => {
            if (!sections.includes(s)) {
                sections.push(s)
                if (!cables.includes(s.cable)) cables.push(s.cable)
                if (!pipes.includes(s.pipe)) pipes.push(s.pipe)
            }
        })
    })
    sections.forEach(s => {
        if (s.startContact != null)
            if (!contacts.includes(s.startContact)) contacts.push(s.startContact)
        if (s.endContact != null)
            if (!contacts.includes(s.endContact)) contacts.push(s.endContact)

    })



}
function setJSONs() {

    Breakers.forEach(b=> jsonBDBreakers.push(JSON.stringify(b)))
    BreakersPower.forEach(b=> jsonBDBreakersPower.push(JSON.stringify(b)))
    Cables.forEach(b=> jsonBDCables.push(JSON.stringify(b)))
    Contactors.forEach(b=> jsonBDContactors.push(JSON.stringify(b)))
    DiffBreakers.forEach(b=> jsonBDDiffBreakers.push(JSON.stringify(b)))
    Fuses.forEach(b=> jsonBDFuses.push(JSON.stringify(b)))
    Pipes.forEach(b=> jsonBDPipes.push(JSON.stringify(b)))




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

    cables.forEach(cab => {
        const cabJSON = JSON.stringify(cab)
        jsonCables.push(cabJSON)
    })

    pipes.forEach(pip => {
        const pipJSON = JSON.stringify(pip)
        jsonPipes.push(pipJSON)
    })
}

