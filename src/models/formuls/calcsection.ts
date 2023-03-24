import { CalculationMode } from "../calculationmode"
import { CommutateApparate } from "../commutateApparate"
import { Consumer } from "../consumer"
import { Contact } from "../contact"
import { Device } from "../device"
import { SectionLine } from "../sectionline"



function setCalculationModes(section: SectionLine): void {
    //режимы каждого приемника
    const modes: string[] = [];
    if (section.subConsumers.length > 0) {

        section.subConsumers.forEach(c => {
            c.calculationModesNames.forEach(m => {
                if (modes.includes(m) === false) {
                    modes.push(m)
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
        cm.consumers.splice(0, cm.consumers.length)
       
        section.subConsumers.forEach(c => {
            if (c.calculationModesNames.includes(cm.name)) {
                cm.consumers.push(c)
             
            }
        })
        
        
    })


}



function setColPhase(section: SectionLine): void {
    let col: number = 1
  

    section.subDevices.forEach(c=> {
        if(c.colPhase > col) col = c.colPhase
    })

    if(section.colPhase == 3){
        if(col == 1){
            if(section.subConsumers.length == 1){
                section.colPhase = 1
            }
        }
    }else{
        if(col == 3){
            section.colPhase = 3
        }
    }


}

export function calc(secton: SectionLine) {

    setColPhase(secton)

    setCalculationModes(secton)
    setConsumersToCalcModes(secton)

    secton.calculationModes.forEach(m => {
        m.calc()
    })

    setModeMax(secton)
    secton.cable.calc()
    secton.pipe.calc()
}