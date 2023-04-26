import { IState } from "@/store";
import { Contact } from "../contact";
import { Device } from "../device";
import { SectionLine } from "../sectionline";
import { useStore } from "vuex";
import { CommutateApparate } from "../commutateApparate";
import { Panel } from "../panel";
import { Consumer } from "../consumer";
import { Breaker } from "../breaker";
import { Cable } from "../cable";
import { Pipe } from "../pipe";

let devices: Array<Device> = []
let sections: Array<SectionLine> = []
let contacts: Array<Contact> = []

interface IJSON {
    jsonDevices: Array<string>,
    jsonSections: Array<string>,
    jsonContacts: Array<string>
    jsonCables: Array<string>
    jsonPipes: Array<string>
}

export function getPanels(jsonString: string) {

    

    devices = []
    sections = []
    contacts = []

    const objJson: IJSON = JSON.parse(jsonString)

    console.log(objJson);
    

    objJson.jsonContacts.forEach(cont => {
        const contact: Contact = Object.assign(new Contact(), JSON.parse(cont))
        contacts.push(contact)
    })

    objJson.jsonSections.forEach(s => {
        const section: SectionLine = Object.assign(new SectionLine(), JSON.parse(s))

        const stCon = contacts.find(c => c.id == JSON.parse(s).startContactId)
        if (stCon != undefined) {
            section.setStartContact(stCon)
        }

        const endCon = contacts.find(c => c.id == JSON.parse(s).endContactId)
        if (endCon != undefined) section.setEndContact(endCon)

        //cablepipe
        objJson.jsonCables.forEach(cab => {

            const cabId = JSON.parse(cab).id

            if (cabId == JSON.parse(s).cableId) {
                section.cable = Object.assign(new Cable(section), JSON.parse(cab))
            }
        })

        objJson.jsonPipes.forEach(p => {

            const pId = JSON.parse(p).id

            if (pId == JSON.parse(s).pipeId) {
                section.pipe = Object.assign(new Pipe(section), JSON.parse(p))
            }
        })
        sections.push(section)
    })


    objJson.jsonDevices.forEach(d => {

        const myArray = d.split(",")
        myArray.forEach(row => {
            if (row.includes('type')) {

                if (row.includes('Breaker')) createBreaker(d)

                if (row.includes('Consumer')) createConsumer(d)
            }
        })

        myArray.forEach(row => {
            if (row.includes('Panel')) createPanel(d)
        })
    })




    const panels = new Array<Panel>()
    devices.forEach(d => {
        if (d instanceof Panel) {
            const pan = d as Panel
            if(!panels.includes(pan))
            panels.push(pan)
        }
    })

    console.log(panels);
    
    return panels

}



function createBreaker(text: string) {
    const breaker: Breaker = Object.assign(new Breaker(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        breaker.inContact = inCon
        inCon.ownDevice = breaker
    }
    const outCon = contacts.find(c => c.id == JSON.parse(text).outContactId)
    if (outCon != undefined) {
        breaker.outContact = outCon
        outCon.ownDevice = breaker
    }
    devices.push(breaker)
}
function createPanel(text: string) {
    const panel: Panel = Object.assign(new Panel(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        panel.inContact = inCon
        inCon.ownDevice = panel
    }

    const outCon = contacts.find(c => c.id == JSON.parse(text).outContactId)
    if (outCon != undefined) {
        panel.outContact = outCon
        outCon.ownDevice = panel
    }


    const s1s = sections.find(s => s.id == JSON.parse(text).s1SectionId)
    if (s1s != undefined) {
        panel.s1Section = s1s
    }

    const unite = sections.find(s => s.id == JSON.parse(text).uniteSectionId)
    if (unite != undefined) panel.uniteSection = unite

    const inApp = devices.find(d => d.id == JSON.parse(text).inApparateId)
    if (inApp != undefined) panel.inApparate = inApp as CommutateApparate
    devices.push(panel)
}
function createConsumer(text: string) {
    const cons: Consumer = Object.assign(new Consumer(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        cons.inContact = inCon
        inCon.ownDevice = cons
    }
    devices.push(cons)
}