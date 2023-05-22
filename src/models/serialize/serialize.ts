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
import { Format } from "../settings/format";
import { GroupBySP } from "../groupbysp";
import { CalculationMode } from "../calculationmode";
import { SpecData } from "../SpecData";
import { HasId } from "../hasid";
import { Breaker } from "../breaker";
import { BreakerPower } from "../breakerPower";



//#region old
export function getJSON(panels: Array<Panel>) {

    //#region jsons Array Init

    //#region BD data
    const jsonBDBreakers: Array<string> = []
    const jsonBDBreakersPower: Array<string> = []
    const jsonBDCables: Array<string> = []
    const jsonBDContactors: Array<string> = []
    const jsonBDDiffBreakers: Array<string> = []
    const jsonBDFuses: Array<string> = []
    const jsonBDPipes: Array<string> = []
    //#endregion

    //#region Elements JSONS
    const jsonDevices: Array<string> = []
    const jsonSections: Array<string> = []
    const jsonContacts: Array<string> = []
    const jsonCables: Array<string> = []
    const jsonPipes: Array<string> = []
    const jsonFormats: Array<string> = []
    const jsonGroupsBySP: Array<string> = []
    const jsonCalculationModes: Array<string> = []
    const jsonSpecDatas: Array<string> = []
    //#endregion

    //#region Elements Array init 
    const devices: Array<Device> = []
    const sections: Array<SectionLine> = []
    const contacts: Array<Contact> = []
    const cables: Array<Cable> = []
    const pipes: Array<Pipe> = []
    const formats: Array<Format> = []
    const groupsBySP: Array<GroupBySP> = []
    const calculationModes: Array<CalculationMode> = []
    const specDatas: Array<SpecData> = []

    //#endregion


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
        jsonPipes: jsonPipes,
        jsonFormats: jsonFormats,
        jsonGroupsBySP: jsonGroupsBySP,
        jsonCalculationModes: jsonCalculationModes,
        jsonSpecDatas: jsonSpecDatas
    })


    function setJSONs() {

        //#region Convert BD to JSON
        Breakers.forEach(b => jsonBDBreakers.push(JSON.stringify(b)))
        BreakersPower.forEach(b => jsonBDBreakersPower.push(JSON.stringify(b)))
        Cables.forEach(b => jsonBDCables.push(JSON.stringify(b)))
        Contactors.forEach(b => jsonBDContactors.push(JSON.stringify(b)))
        DiffBreakers.forEach(b => jsonBDDiffBreakers.push(JSON.stringify(b)))
        Fuses.forEach(b => jsonBDFuses.push(JSON.stringify(b)))
        Pipes.forEach(b => jsonBDPipes.push(JSON.stringify(b)))
        //#endregion


        //#region Convert Devices to JSON
        devices.forEach(c => {
            const devJSON = JSON.stringify(c)
            jsonDevices.push(devJSON)
        })
        //#endregion


        //#region Convert Sections to JSON
        sections.forEach(s => {
            const secJSON = JSON.stringify(s)
            jsonSections.push(secJSON)
        })
        //#endregion


        //#region Convert Contacts to JSON
        contacts.forEach(c => {
            const contJSON = JSON.stringify(c)
            jsonContacts.push(contJSON)
        })
        //#endregion


        //#region Convert Cables to JSON
        cables.forEach(cab => {
            const cabJSON = JSON.stringify(cab)
            jsonCables.push(cabJSON)
        })
        //#endregion


        //#region Convert Pipes to JSON
        pipes.forEach(pip => {
            const pipJSON = JSON.stringify(pip)
            jsonPipes.push(pipJSON)
        })
        //#endregion

        //#region Convert Formats to JSON
        formats.forEach(form => {
            const forJSON = JSON.stringify(form)
            jsonFormats.push(forJSON)
        })
        //#endregion

        //#region Convert GroupsBySP to JSON
        groupsBySP.forEach(g => {
            const gJSON = JSON.stringify(g)
            jsonGroupsBySP.push(gJSON)
        })
        //#endregion

        //#region Convert CalculationModes to JSON
        calculationModes.forEach(m => {
            const mJSON = JSON.stringify(m)
            jsonCalculationModes.push(mJSON)
        })
        //#endregion

        //#region Convert SpecDatas to JSON
        specDatas.forEach(m => {
            const mJSON = JSON.stringify(m)
            jsonSpecDatas.push(mJSON)
        })
        //#endregion

    }


    function setElements() {

        //#region set Devices and Formats

        panels.forEach(p => {
            const devs = p.s1Section.subDevices
            devs.forEach(d => {
                if (!devices.includes(d)) devices.push(d)
                if (d instanceof Panel) formats.push(d.format)
            })
        })
        //#endregion

        //#region set Sections and Cables & Pipes
        panels.forEach(p => {

            p.s1Section.subDevices.forEach(dev => specDatas.push(dev.specData))
            if (!specDatas.includes(p.specData)) specDatas.push(p.specData)
            sections.push(p.s1Section)
            p.cables.forEach(c => {
                cables.push(c)
                specDatas.push(c.specData)
            })
            p.pipes.forEach(c => {
                pipes.push(c)
                specDatas.push(c.specData)
            })
            const sects = p.s1Section.subSections
            sects.forEach(s => {
                if (!sections.includes(s)) {
                    sections.push(s)
                    if (!cables.includes(s.cable)) cables.push(s.cable)
                    if (!pipes.includes(s.pipe)) pipes.push(s.pipe)
                }
            })
        })
        //#endregion

        //#region set Contacts
        sections.forEach(s => {
            if (s.startContact != null)
                if (!contacts.includes(s.startContact)) contacts.push(s.startContact)
            if (s.endContact != null)
                if (!contacts.includes(s.endContact)) contacts.push(s.endContact)

        })
        //#endregion

        //#region set GroupsBySP and CalcModes
        sections.forEach(s => {
            s.calculationModes.forEach(cm => {
                if (!calculationModes.includes(cm)) calculationModes.push(cm)
                cm.groupsBySPList.forEach(g => {
                    if (!groupsBySP.includes(g)) groupsBySP.push(g)
                })

            })
        })
        //#endregion



    }
}
//#endregion


export function getJSONRecurcy(panels: Array<Panel>): string {
    let finalJSON: string = ''

    const allObjects: Array<HasId> = []
    const allReplacedObjects: Array<HasId> = []
    const allObjectsString: Array<string> = []




    panels.forEach(p => recurcySetAllObjects(p))

   

    allObjects.forEach(o => allReplacedObjects.push(replaceObject(o) as HasId))
    console.log(allReplacedObjects);

    allReplacedObjects.forEach(o => {
        allObjectsString.push(JSON.stringify(o))
    })


    finalJSON = JSON.stringify(allObjectsString)




    function recurcySetAllObjects(objClass: any) {
        if (typeof objClass != 'object') return
        const jsonTobj = allObjects.find(o => o.id == objClass.id)
        if (jsonTobj == undefined) {

            const hasidobj = objClass
        
            allObjects.push(hasidobj)
        }
        for (let key in objClass) {
            const k = key as keyof typeof objClass

            if (objClass[k] instanceof HasId) {
                const jsonObj = allObjects.find(o => o.id == objClass[k].id)
                if (jsonObj == undefined) {
                    const hasidobj = objClass[k]
              
                    allObjects.push(hasidobj)
                    recurcySetAllObjects(objClass[k])
                }
            } else if (Array.isArray(objClass[k])) {

                const arr = objClass[k] as []

                arr.forEach(element => {
                    if (typeof element == 'object')
                        recurcySetAllObjects(element)
                });
            }

        }
    }



    function replaceObject(object: any): object {
        let replObj = Object.assign({}, object)

        for (let key in object) {
            const k = key as keyof typeof object
            if (object[k] instanceof HasId) {

                //заменим название поля добавим _T_
                const newKey = k.toString() + '_T_'
                replObj[newKey] = object[k].id
                replObj[k] = null

            } else if (Array.isArray(object[k])) {
                const arr = object[k] as Array<any>
                if (arr.length > 0 && arr[0] instanceof HasId) {
                    const ids = new Array<string>()

                    arr.forEach(obj => {
                        if (obj instanceof HasId) ids.push(obj.id.toString())
                    })

                    const newKey = k.toString() + '_T_'
                    replObj[newKey] = ids
                    replObj[k] = null
                }

            }

        }

        return replObj;
    };

    return finalJSON

}

