import { Breakers } from "../bd/breakers"
import { BreakersPower } from "../bd/breakersPower"
import { Cables } from "../bd/cables"
import { Contactors } from "../bd/contactors"
import { DiffBreakers } from "../bd/diffbreakers"
import { Fuses } from "../bd/fuses"
import { Breaker } from "../breaker"
import { BreakerPower } from "../breakerPower"
import { CommutateApparate } from "../commutateApparate"
import { Consumer } from "../consumer"
import { Contact } from "../contact"
import { Contactor } from "../contactor"
import { Device } from "../device"
import { DiffBreaker } from "../diffBreaker"
import { Fuse } from "../fuse"
import { Panel } from "../panel"
import { defaults } from "../schemedefs"
import { SectionLine } from "../sectionline"
import { useStore } from "vuex"

export function addContactor(section: SectionLine) {



    let endDevice: Device = new Consumer()

    if (section.endContact?.ownDevice !== null)
        if (section.endContact) endDevice = section.endContact.ownDevice



    let supplyContact: Contact = new Contact(new Consumer())
    let supplySection: SectionLine = new SectionLine()




    if (section.startContact) recurcy(section.startContact)
    function recurcy(contact: Contact) {
        contact.getSupplySections().forEach(s => {
            if (s.startContact) {
                if (s.startContact.ownDevice instanceof Panel) {
                    supplyContact = s.startContact
                } else {
                    recurcy(s.startContact)
                }
            }
        })
    }

    supplyContact.getSlaveSections().forEach(s => {
        if (s.subSections.includes(section)) {
            supplySection = s

        }
    })


    const contactor = new Contactor(Contactors[0].mark)


    section.setEndContact(contactor.inContact)


    const sconsumer = new SectionLine()
    sconsumer.setStartContact(contactor.outContact)
    if (endDevice) sconsumer.setEndContact(endDevice.inContact)



    sconsumer.cable.mark = Cables[0].mark
    if (supplyContact != null) sconsumer.nameOfPlane = 'M' + (supplyContact.getSlaveSections().indexOf(supplySection) + 1).toString() + '-2'

    section.nameOfPlane = section.nameOfPlane + '-1'

    section.getSupplyPanels().forEach(p => {
        p.calc()
        rename(p)
    })
}

export function addConsumer(contact: Contact) {
    const consumer = new Consumer()
    let myStr = contact.getSlaveSections()[contact.getSlaveSections().length - 1].nameOfPlane
    const myArr = myStr.split('-')
    myStr = myArr[0]

    consumer.nameOfPlane = 'N' + (contact.getSupplySections()[0].getSupplyPanels()[0].uniteSection.subConsumers.length + 1)
    const sConsumer = new SectionLine()
    sConsumer.nameOfPlane = myStr + '-' + (contact.getSlaveSections().length + 2)
    sConsumer.cable.mark = Cables[0].mark
    sConsumer.setEndContact(consumer.inContact)
    sConsumer.setStartContact(contact)

    // const panels = getSupplyPanels(contact)

    if (contact.ownDevice != null)
        contact.ownDevice.getSupplyPanels().forEach(p => {
            p.calc()
            rename(p)
        })

}

export function deleteObject(object: any) {
    if (object instanceof SectionLine) {
        const sl = object as SectionLine
        if (sl.startContact != null) {
            sl.startContact.removeSection(sl)
            if (sl.startContact.ownDevice != null)
                delEmpty(sl.startContact.ownDevice)
        }

        sl.getSupplyPanels().forEach(p => {
            p.calc()
            rename(p)
        })

    } else if (object instanceof Device) {
        const d = object as Device
        d.inContact.getSupplySections().forEach(s => s.startContact?.removeSection(s))
        delEmpty(d)
    }

    function delEmpty(d: Device) {
        d.getSupplyPanels().forEach(p => {
            p.outContact.getSlaveSections().forEach(s => {
                if (s.subConsumers.length == 0) s.startContact?.removeSection(s)
            })
            rename(p)
        })
    }


}

export function addOneConsumerFeeder(panel: Panel) {


    const breaker = new Breaker(Breakers[0].mark)

    breaker.nameOfPlane = 'QF' + (panel.outContact.getSlaveSections().length + 1).toString()
    const sBreaker = new SectionLine()
    sBreaker.description = 'sBreaker'
    sBreaker.isInPanel = true
    sBreaker.setStartContact(panel.outContact)
    sBreaker.setEndContact(breaker.inContact)

    const consumer = new Consumer()

    consumer.nameOfPlane = 'N' + (panel.uniteSection.subConsumers.length + 1).toString()
    consumer.description = 'Наименование'

    const sConsumer = new SectionLine()
    sConsumer.setEndContact(consumer.inContact)
    sConsumer.description = 'sConsumer'
    sConsumer.nameOfPlane = 'M' + (panel.outContact.getSlaveSections().length).toString()
    sConsumer.cable.mark = Cables[0].mark
    sConsumer.setStartContact(breaker.outContact)
    panel.calc()
}

function rename(panel: Panel) {
    panel.outContact.getSlaveSections().forEach(s => {
        //--sUnderBreaker
        s.endContact?.getSlaveSections()[0].endContact?.getSlaveSections().forEach(sl => {
            sl.nameOfPlane = defaults.sectionPrefix + (panel.outContact.getSlaveSections().indexOf(s) + 1)
        })
        //--breaker
        if (s.endContact) {
            if (s.endContact.ownDevice instanceof Breaker) {
                s.endContact.ownDevice.nameOfPlane = 'QF' + + (panel.outContact.getSlaveSections().indexOf(s) + 1)
            }
        }
        // //--consumer
        // s.subConsumers.forEach(c => {
        //     c.nameOfPlane = defaults.consumerPrefix + (panel.uniteSection.subConsumers.indexOf(c) + 1)
        // })
        //--sUnderContactor
        s.subConsumers.forEach(c => {
            if (c.inContact.getSupplySections()[0].startContact?.ownDevice instanceof Contactor) {
                const cont = c.inContact.getSupplySections()[0].startContact?.ownDevice as Contactor
                c.inContact.getSupplySections()[0].nameOfPlane = cont.inContact.getSupplySections()[0].nameOfPlane + '-' + (cont.outContact.getSlaveSections().indexOf(c.inContact.getSupplySections()[0]) + 1)
            }
        })

    })

    //--contactor
    const contactors: Array<Contactor> = new Array<Contactor>()
    panel.uniteSection.subDevices.forEach(d => {

        if (d instanceof Contactor) {
            contactors.push(d as Contactor)
        }
        contactors.forEach(c => {
            c.nameOfPlane = 'KM' + (contactors.indexOf(c) + 1)
        })
    })
}


export function addCommApparateToFeeder(supplContact: Contact, newApp: CommutateApparate, section: SectionLine){
    const sBreaker = new SectionLine()
    sBreaker.setStartContact(supplContact)
    sBreaker.setEndContact(newApp.inContact)
    section.setStartContact(newApp.outContact)
}


export function replaceCommApparate(oldApp: CommutateApparate, newApp: CommutateApparate | null) {
    const oldInSupplyes: Array<SectionLine> = oldApp.inContact.getSupplySections()
    const oldInSlaves: Array<SectionLine> = oldApp.inContact.getSlaveSections()

    const oldOutSlaves: Array<SectionLine> = oldApp.outContact.getSlaveSections()


    if (newApp == null) {
        const supplayContact = oldApp.inContact.getSupplySections()[0].startContact
        const supplaySection = oldApp.inContact.getSupplySections()[0]
        const indx = supplayContact?.sectionLines.indexOf(supplaySection)

        if (supplayContact != null){
            oldOutSlaves.forEach(s => {
                s.setStartContact(supplayContact)
            })
            supplayContact.removeSection(supplaySection)

            
        }
            


    } else {
        oldInSupplyes.forEach(s => {
            s.setEndContact(newApp.inContact)
        })
        oldInSlaves.forEach(s => {
            if (s.id != oldApp.innerSection.id)
                s.setStartContact(newApp.inContact)
        })
        oldOutSlaves.forEach(s => {
            s.setStartContact(newApp.outContact)
        })
    }
 
}

export function changeAppType(currApp:CommutateApparate, option: any): CommutateApparate | null{
    
    if(option.type == 'Предохранитель'){
        const fuse = new Fuse(Fuses[0].mark)
        const indx = currApp.nameOfPlane.match(/\d+/)?.[0] || ""
        fuse.nameOfPlane = 'FU' + indx
        replaceCommApparate(currApp, fuse)
        return fuse
        
    }else if(option.type == 'Дифф. автомат'){
        const diffBreaker = new DiffBreaker(DiffBreakers[0].mark)
        const indx = currApp.nameOfPlane.match(/\d+/)?.[0] || ""
        diffBreaker.nameOfPlane = 'QFD' + indx
        replaceCommApparate(currApp, diffBreaker)
        return diffBreaker
    }else if(option.type == 'Автоматический выключатель'){
        const breaker = new Breaker(Breakers[0].mark)
        const indx = currApp.nameOfPlane.match(/\d+/)?.[0] || ""
        breaker.nameOfPlane = 'QF' + indx
        replaceCommApparate(currApp, breaker)
        return breaker
    }else if(option.type == 'Выключатель нагрузки'){
        const breakerPower = new BreakerPower(BreakersPower[0].mark)
        const indx = currApp.nameOfPlane.match(/\d+/)?.[0] || ""
        breakerPower.nameOfPlane = 'QW' + indx
        replaceCommApparate(currApp, breakerPower)
        return breakerPower
    }else {
        return null
    }

}