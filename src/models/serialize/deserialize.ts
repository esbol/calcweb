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
import { Format } from "../settings/format";
import { Stamp } from "../settings/stamp";
import { CalculationMode } from "../calculationmode";
import { GroupBySP } from "../groupbysp";



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
    jsonPipes: Array<string>,
    jsonFormats: Array<string>,
    jsonGroupsBySP: Array<string>,
    jsonCalculationModes: Array<string>,
}

export function getPanels(jsonString: string):Array<Panel> {


    //#region Elements Array init
    const devices: Array<Device> = []
    const sections: Array<SectionLine> = []
    const contacts: Array<Contact> = []
    const formats: Array<Format> = []
    const calculationModes: Array<CalculationMode> = []
    const groupsBySP: Array<GroupBySP> = []
    //#endregion



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

    //#region setFormats form JSON
    objJson.jsonFormats.forEach(f => {
        const objFormat = JSON.parse(f)
        const format: Format = Object.assign(new Format(), objFormat)

        format.stamp = Object.assign(new Stamp(), objFormat.stamp)
        formats.push(format)
    })
    //#endregion

    //#region setGroupsBySP form JSON
    objJson.jsonGroupsBySP.forEach(g => {
        const objG = JSON.parse(g)
        const group: GroupBySP = Object.assign(new GroupBySP(''), objG)
        groupsBySP.push(group)

    })
    //#endregion


    //#region setCalculationModes form JSON
    objJson.jsonCalculationModes.forEach(m => {
        const objMode = JSON.parse(m)
        const mode: CalculationMode = Object.assign(new CalculationMode('', new SectionLine()), objMode)

        mode.groupsBySPList.splice(0, mode.groupsBySPList.length)
        groupsBySP.forEach(gr => {

            if (objMode.groupsBySPListIds.includes(gr.id.toString())) {
                mode.groupsBySPList.push(gr)

            }

        })
        calculationModes.push(mode)


    })
    //#endregion

    //#region setContacts form JSON
    objJson.jsonContacts.forEach(cont => {
        const contact: Contact = Object.assign(new Contact(), JSON.parse(cont))
        contacts.push(contact)
    })
    //#endregion

    //#region setSections form JSON
    objJson.jsonSections.forEach(s => {
        const objSection = JSON.parse(s)
        const section: SectionLine = Object.assign(new SectionLine(), objSection)

        const mMax = calculationModes.find(cm => cm.id == objSection.modeMaxId)

        if (mMax != undefined) section.modeMax = mMax

        section.calculationModes.splice(0, section.calculationModes.length)
        const calcIds: Array<string> = objSection.calculationModesIds

        
        calcIds.forEach(i => {
            const mode = calculationModes.find(c => c.id == Number(i))

            if (mode != undefined) section.calculationModes.push(mode)
        })

        objJson.jsonCalculationModes.forEach(cm=>{
            const objCM = JSON.parse(cm)
            if(objCM.sectionId == section.id){
                const calcMode = calculationModes.find(c=>c.id == objCM.id)
                if(calcMode != undefined) calcMode.section = section
            }
        })
       


        const stCon = contacts.find(c => c.id == objSection.startContactId)
        if (stCon != undefined) {
            section.setStartContact(stCon)
        }

        const endCon = contacts.find(c => c.id == objSection.endContactId)
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
    //#endregion

    //#region setDevices form JSON
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
    //#endregion


    //#region Create complex Classes 
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

       
        setSpecDataToDevice(text, panel)

        const panelFormat = formats.find(f => f.id == JSON.parse(text).formatId)

        if (panelFormat != undefined) {
            panel.format = panelFormat

        }

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
    //#endregion

    //#region set Panels form JSON
    const panels = new Array<Panel>()
    devices.forEach(d => {
        if (d instanceof Panel) {
            const pan = d as Panel
            if (!panels.includes(pan))
                panels.push(pan)
        }
    })
    //#endregion

    return panels

}








function setSpecDataToDevice(text: string, device: Device) {
    const sp = JSON.parse(text).specData
    device.specData = new SpecData(sp.description, sp.mark, sp.code, sp.factory, sp.units, sp.count, sp.mass, sp.note)
}