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
import { Contactor } from "../contactor";
import { Fuse } from "../fuse";
import { DiffBreaker } from "../diffBreaker";
import { BreakerPower } from "../breakerPower";
import { SpecData } from "../SpecData";
import { Breakers, IBreaker } from "../bd/breakers";
import { BreakersPower, IBreakerPower } from "../bd/breakersPower";
import { Cables, ICable } from "../bd/cables";
import { Contactors, IContactor } from "../bd/contactors";
import { DiffBreakers, IDiffBreaker } from "../bd/diffbreakers";
import { Fuses, IFuse } from "../bd/fuses";
import { IPipe, Pipes } from "../bd/pipes";

let devices: Array<Device> = []
let sections: Array<SectionLine> = []
let contacts: Array<Contact> = []

interface IJSON {
    jsonBDBreakers: Array<string>,
    jsonBDBreakersPower: Array<string>,
    jsonBDCables: Array<string>,
    jsonBDContactors: Array<string>,
    jsonBDDiffBreakers: Array<string>,
    jsonBDFuses: Array<string>,
    jsonBDPipes: Array<string>,
    jsonDevices: Array<string>,
    jsonSections: Array<string>,
    jsonContacts: Array<string>
    jsonCables: Array<string>,
    jsonPipes: Array<string>
}

export function getPanels(jsonString: string) {



    devices = []
    sections = []
    contacts = []


    const objJson: IJSON = JSON.parse(jsonString)

    //#region setBDBreakers
    const breakers: Array<IBreaker> = []
    objJson.jsonBDBreakers.forEach(b => breakers.push(JSON.parse(b)))

    breakers.forEach(br => {
        const ibr = Breakers.find(b => b.factory == br.factory && b.mark == br.mark)
        if (ibr == undefined) Breakers.push(br)
    })
    //#endregion

    //#region setBDBreakersPower
    const breakersPower: Array<IBreakerPower> = []
    objJson.jsonBDBreakersPower.forEach(b => breakersPower.push(JSON.parse(b)))

    breakersPower.forEach(br => {
        const ibr = BreakersPower.find(b => b.factory == br.factory && b.mark == br.mark)
        if (ibr == undefined) BreakersPower.push(br)
    })
    //#endregion

    //#region setBDCables
    const cables: Array<ICable> = []
    objJson.jsonBDCables.forEach(b => cables.push(JSON.parse(b)))

    cables.forEach(br => {
        const ibr = Cables.find(b => b.mark == br.mark)
        if (ibr == undefined) Cables.push(br)
    })
    //#endregion

    //#region setBDContactors
    const contactors: Array<IContactor> = []
    objJson.jsonBDContactors.forEach(b => contactors.push(JSON.parse(b)))

    contactors.forEach(br => {
        const ibr = Contactors.find(b => b.mark == br.mark)
        if (ibr == undefined) Contactors.push(br)
    })
    //#endregion

    //#region setBDDiffBreakers
    const diffBreakers: Array<IDiffBreaker> = []
    objJson.jsonBDDiffBreakers.forEach(b => diffBreakers.push(JSON.parse(b)))

    diffBreakers.forEach(br => {
        const ibr = DiffBreakers.find(b => b.factory == br.factory && b.mark == br.mark)
        if (ibr == undefined) DiffBreakers.push(br)
    })
    //#endregion

    //#region setBDFuses
    const fuses: Array<IFuse> = []
    objJson.jsonBDFuses.forEach(b => fuses.push(JSON.parse(b)))

    fuses.forEach(br => {
        const ibr = Fuses.find(b => b.factory == br.factory && b.mark == br.mark)
        if (ibr == undefined) Fuses.push(br)
    })
    //#endregion

     //#region setBDPipes
     const pipes: Array<IPipe> = []
     objJson.jsonBDPipes.forEach(b => pipes.push(JSON.parse(b)))
 
     pipes.forEach(br => {
         const ibr = Pipes.find(b => b.mark == br.mark)
         if (ibr == undefined) Pipes.push(br)
     })
     //#endregion

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
        const objDev = JSON.parse(d)

        if (objDev.type == 'Breaker') createBreaker(d)
        if (objDev.type == 'BreakerPower') createBreakerPower(d)
        if (objDev.type == 'Fuse') createFuse(d)
        if (objDev.type == 'DiffBreaker') createDiffBreaker(d)
        if (objDev.type == 'Contactor') createContactor(d)
        if (objDev.type == 'Consumer') createConsumer(d)
        if (objDev.type == 'Panel') createPanel(d)

    })



    const panels = new Array<Panel>()
    devices.forEach(d => {
        if (d instanceof Panel) {
            const pan = d as Panel
            if (!panels.includes(pan))
                panels.push(pan)
        }
    })



    return panels

}



function createBreaker(text: string) {
    const objBr = JSON.parse(text)
    const sp = objBr.specData
    const ibr = Breakers.find(b => b.factory == sp.factory && b.mark == objBr.mark)


    if (ibr == undefined) {
        Breakers.push({
            factory: sp.factory,
            mark: objBr.mark,
            colPhase: objBr.colPhase,
            character: objBr.currentCharacter,
            possibleCurrents: [objBr.nominalCurrent]
        })
    }


    const breaker: Breaker = Object.assign(new Breaker(), objBr)
    const inCon = contacts.find(c => c.id == objBr.inContactId)
    if (inCon != undefined) {
        breaker.inContact = inCon
        inCon.ownDevice = breaker
    }
    const outCon = contacts.find(c => c.id == objBr.outContactId)
    if (outCon != undefined) {
        breaker.outContact = outCon
        outCon.ownDevice = breaker
    }

    breaker.specData = new SpecData(sp.description, sp.mark, sp.code, sp.factory, sp.units, sp.count, sp.mass, sp.note)
    //по новой задаем марку, т.к. от производителя зависит марка
    breaker.mark = objBr.mark

    devices.push(breaker)
}
function createBreakerPower(text: string) {
    const breakerPower: BreakerPower = Object.assign(new BreakerPower(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        breakerPower.inContact = inCon
        inCon.ownDevice = breakerPower
    }
    const outCon = contacts.find(c => c.id == JSON.parse(text).outContactId)
    if (outCon != undefined) {
        breakerPower.outContact = outCon
        outCon.ownDevice = breakerPower
    }
    setSpecDataToDevice(text, breakerPower)
    devices.push(breakerPower)
}
function createFuse(text: string) {
    const fuse: Fuse = Object.assign(new Fuse(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        fuse.inContact = inCon
        inCon.ownDevice = fuse
    }
    const outCon = contacts.find(c => c.id == JSON.parse(text).outContactId)
    if (outCon != undefined) {
        fuse.outContact = outCon
        outCon.ownDevice = fuse
    }
    setSpecDataToDevice(text, fuse)
    devices.push(fuse)
}
function createDiffBreaker(text: string) {
    const diffBreaker: DiffBreaker = Object.assign(new DiffBreaker(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        diffBreaker.inContact = inCon
        inCon.ownDevice = diffBreaker
    }
    const outCon = contacts.find(c => c.id == JSON.parse(text).outContactId)
    if (outCon != undefined) {
        diffBreaker.outContact = outCon
        outCon.ownDevice = diffBreaker
    }
    setSpecDataToDevice(text, diffBreaker)
    devices.push(diffBreaker)
}
function createContactor(text: string) {
    const contactor: Contactor = Object.assign(new Contactor(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        contactor.inContact = inCon
        inCon.ownDevice = contactor
    }
    const outCon = contacts.find(c => c.id == JSON.parse(text).outContactId)
    if (outCon != undefined) {
        contactor.outContact = outCon
        outCon.ownDevice = contactor
    }
    setSpecDataToDevice(text, contactor)
    devices.push(contactor)
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

    setSpecDataToDevice(text, panel)
    devices.push(panel)
}
function createConsumer(text: string) {
    const cons: Consumer = Object.assign(new Consumer(), JSON.parse(text))
    const inCon = contacts.find(c => c.id == JSON.parse(text).inContactId)
    if (inCon != undefined) {
        cons.inContact = inCon
        inCon.ownDevice = cons
    }
    setSpecDataToDevice(text, cons)
    devices.push(cons)
}




function setSpecDataToDevice(text: string, device: Device) {
    const sp = JSON.parse(text).specData
    device.specData = new SpecData(sp.description, sp.mark, sp.code, sp.factory, sp.units, sp.count, sp.mass, sp.note)
}