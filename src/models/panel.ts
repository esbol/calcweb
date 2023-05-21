import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";

import { CommutateApparate } from './commutateApparate';

import { addOneConsumerFeeder } from './schemeActions/schemeactions';
import { Cable } from './cable';
import { Format } from './settings/format';
import { Pipe } from './pipe';
import { Breaker } from './breaker';
import { Breakers } from './bd/breakers';


export class Panel extends Device {
    setDataFromDB(mark: string): boolean {
        return true
    }
    constructor() {
        super()
        const inApparate = new Breaker(Breakers[0].mark)
        inApparate.nameOfPlane = 'QF'
        inApparate.isInApparate = true
        this.s1Section = new SectionLine()
        this.outContact = new Contact(this)
        this.s1Section.setStartContact(this.inContact)
        this.s1Section.setEndContact(inApparate.inContact)

        const uniteSection = new SectionLine()
        uniteSection.setStartContact(inApparate.outContact)
        uniteSection.setEndContact(this.outContact)


        uniteSection.nameOfPlane = 'uniteSection'
        uniteSection.description = 'uniteSection'
        uniteSection.isInPanel = true

        this.description = 'panel'
        this.inContact.description = 'panelInCont'
        this.outContact.description = 'panelOutCont'
        this.s1Section.nameOfPlane = 's1Section'
        this.s1Section.description = 's1Section'
        this.s1Section.isInPanel = true
  
        this.specData.description = "Шкаф распределительный"
        this.specData.units = "компл."
    }
    outContact: Contact
    
    s1Section: SectionLine;

     //#region uniteSection
     private _uniteSection:SectionLine = new SectionLine()
     public get uniteSection(): SectionLine{
        this._uniteSection = this.outContact.getSupplySections()[0]
        return this.outContact.getSupplySections()[0]
    }
    //#endregion

    //#region inApparate
    private _inApparate:CommutateApparate | null = null
    public get inApparate(): CommutateApparate | null {
        const app = this.outContact.getSupplySections()[0].startContact?.ownDevice
        
        if (app != null) {
            this._inApparate = app as CommutateApparate
            if (app instanceof CommutateApparate) {
                return app as CommutateApparate
            } else return null
        } else return null
    }

    //#endregion

    //#region cables
    private _cables: Array<Cable> = new Array<Cable>()
    public get cables(): Array<Cable> {
        return this._cables;
    }
    public set cables(v: Array<Cable>) {
        this._cables = v;
    }
    //#endregion

    //#region pipes
    private _pipes: Array<Pipe> = new Array<Pipe>()
    public get pipes(): Array<Pipe> {
        return this._pipes;
    }
    public set pipes(v: Array<Pipe>) {
        this._pipes = v;
    }
    //#endregion

    public calc() {

        this.s1Section.calc()

        const sections = this.s1Section.subSections
        sections.sort((a, b) => a.subSections.length - b.subSections.length)


        sections.forEach(s => {
            s.calc()
            if(s.endContact != null){
                if(s.endContact.ownDevice instanceof CommutateApparate){
                    s.endContact.ownDevice.calc()
                }
            }
        })
        //корректировка по автомату
        sections.forEach(s => {
            s.calc()
        })

        for (const item of this.s1Section.subDevices) {
            if (item.colPhase == 3) {
                this.colPhase = 3
                break
            }
        }

      







        this.calcColCables()
        this.calcColPipes()
    }

    public addFeeder() {

        addOneConsumerFeeder(this)

    }

    private calcColCables() {
        const cables = new Array<Cable>()
        this.uniteSection.subSections.forEach(s => {
            if (!s.isInPanel) {
                if (s.cable.length > 0) {
                    cables.push(s.cable)
                }
            }
        })

        const sumCables: Array<Cable> = new Array<Cable>()
        cables.forEach(c => {
            const cable = new Cable(this.uniteSection)
            cable.mark = c.mark
            cable.square = c.square
            cable.colCores = c.colCores

            cables.forEach(cab => {
                if (cab.mark == cable.mark && cab.colCores == cable.colCores && cab.square == cable.square) {
                    cable.length += cab.length
                }
            })

            let isSame = false

            sumCables.forEach(cab => {
                if (cab.mark == cable.mark && cab.colCores == cable.colCores && cab.square == cable.square) {
                    isSame = true
                }
            })

            if (!isSame) sumCables.push(cable)
        })

        sumCables.sort((a: Cable, b: Cable) => {
            const markA = a.mark.toUpperCase()
            const markB = b.mark.toUpperCase()
            if (markA < markB) {
                return -1
            }
            if (markA > markB) {
                return 1
            }
            return 0
        })
        sumCables.sort((a: Cable, b: Cable) => a.colCores - b.colCores)
        sumCables.sort((a: Cable, b: Cable) => a.square - b.square)

        this.cables = sumCables
    }

    private calcColPipes() {
        const pipes = new Array<Pipe>()
        this.uniteSection.subSections.forEach(s => {
            if (!s.isInPanel) {
                if (s.pipe.length > 0) {
                    pipes.push(s.pipe)
                }
            }
        })


        const sumPipes: Array<Pipe> = new Array<Pipe>()
        pipes.forEach(c => {
            const pipe = new Pipe(this.uniteSection)
            pipe.mark = c.mark
            pipe.diametr = c.diametr

            pipes.forEach(cab => {
                if (cab.mark == pipe.mark && cab.diametr == pipe.diametr) {
                    pipe.length += cab.length
                }
            })

            let isSame = false

            sumPipes.forEach(cab => {
                if (cab.mark == pipe.mark && cab.diametr == pipe.diametr) {
                    isSame = true
                }
            })

            if (!isSame) sumPipes.push(pipe)
        })

        sumPipes.sort((a: Pipe, b: Pipe) => {
            const markA = a.mark.toUpperCase()
            const markB = b.mark.toUpperCase()
            if (markA < markB) {
                return -1
            }
            if (markA > markB) {
                return 1
            }
            return 0
        })
        sumPipes.sort((a: Pipe, b: Pipe) => a.diametr - b.diametr)

        this.pipes = sumPipes


    }

    //#region format
    private _format: Format = new Format()
    public get format(): Format {
        return this._format;
    }
    public set format(v: Format) {
        this._format = v;
    }
    //#endregion 

    // toJSON() {
    //     let pipesIds = new Array<string>()
    //     this.pipes.forEach(g=>pipesIds.push(g.id.toString()))
    //     let cablesIds = new Array<string>()
    //     this.cables.forEach(g=>cablesIds.push(g.id.toString()))
    //     return Object.assign(super.toJSON(), {
    //         outContactId: this.outContact.id,
    //         s1SectionId: this.s1Section.id,
    //         uniteSectionId: this.uniteSection.id,
    //         type: 'Panel',
    //         formatId: this.format.id,
    //         inApparateId: this.inApparate?.id,
    //         cablesIds: cablesIds,
    //         pipesIds: pipesIds
    //     })
    // }
}