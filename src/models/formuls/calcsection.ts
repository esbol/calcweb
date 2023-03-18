import { CalculationMode } from "../calculationmode"
import { CommutateApparate } from "../commutateApparate"
import { Consumer } from "../consumer"
import { Contact } from "../contact"
import { Device } from "../device"
import { SectionLine } from "../sectionline"

function setSubDevices(section: SectionLine): void {
    section.subDevices.splice(0, section.subDevices.length)
    const devlist = section.subDevices
    const endContact = section.endContact

    if (endContact !== null) recurcy(endContact)

    function recurcy(endC: Contact) {
        if (devlist.includes(endC.ownDevice) === false) {
            devlist.push(endC.ownDevice)
        }

        endC.sectionLines.forEach(s => {
            if (s.startContact === endC) {
                if (s.endContact !== null) recurcy(s.endContact)
            }
        })
    }
    return
}

function setSubConsumers(section: SectionLine): void {
    section.subConsumers.splice(0, section.subConsumers.length)
    const conslist = section.subConsumers

    section.subDevices.forEach(d => {
        if (d instanceof Consumer && conslist.includes(d as Consumer) === false) {
            conslist.push(d as Consumer)
        }

    })
}

function setCalculationModes(section: SectionLine): void {
    //режимы каждого приемника
    const modes: string[] = [];
    if (section.subConsumers.length > 0) {

        section.subConsumers.forEach(c => {
            c.calculationModes.forEach(m => {
                if (modes.includes(m) === false) {
                    modes.push(m.toLowerCase())
                }
            })
        })

    }


    //добавляем отсутсвующие
    modes.forEach(m => {
        let exist: boolean = false
        section.calculationModes.forEach(cm => {
            if (cm.name === m) {
                exist = true
            }
        })
        if (exist === false) {
            section.calculationModes.push(
                new CalculationMode(m, section)
            )
        }
    })

    const forDel = new Array<CalculationMode>()
    section.calculationModes.forEach(cm => {
        if (modes.includes(cm.name) === false) {
            forDel.push(cm)
        }
    })
    forDel.forEach(cm => {
        section.calculationModes.splice(
            section.calculationModes.indexOf(cm), 1
        )
    })

}

function setModeMax(section: SectionLine): void {
    let mMode = section.calculationModes[0]
    let cur = 0
    section.calculationModes.forEach(m => {
        if (m.current > cur) mMode = m
    })
    section.modeMax = mMode
}

function setConsumersToCalcModes(section: SectionLine): void {
    section.calculationModes.forEach(cm => {
        cm.consumers = new Array<Consumer>()

        section.subConsumers.forEach(c => {
            if (c.calculationModes.includes(cm.name)) {
                cm.consumers.push(c)
            }
        })

    })


}

function setSubSections(section: SectionLine): void {
    section.subSections.splice(0, section.subSections.length)
    const subSec = section.subSections

    if (section.endContact !== null) recurcy(section.endContact)
    function recurcy(endContact: Contact): void {
        endContact.getSlaveSections().forEach(s => {
            if (subSec.includes(s) === false) {
                subSec.push(s)
            }
            if (s.endContact !== null) recurcy(s.endContact)
        })
    }
}

function setColPhase(section: SectionLine): void {
    let col: number = 1
  

    section.subConsumers.forEach(c=> {
        if(c.colPhase> col) col = c.colPhase
    })

 

    if(col == 3) section.colPhase = 3
    else section.colPhase = 1


}

export function calc(secton: SectionLine) {

    // setSubSections(secton)
    // setSubDevices(secton)
    // setSubConsumers(secton)
    setColPhase(secton)

    setCalculationModes(secton)
    setConsumersToCalcModes(secton)

    secton.calculationModes.forEach(m => {
        m.calc()
    })

    setModeMax(secton)
}