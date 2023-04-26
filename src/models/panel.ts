import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";

import { CommutateApparate } from './commutateApparate';
import { Bus } from './bus';
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
        this.inApparate = new Breaker(Breakers[0].mark)
        this.inApparate.nameOfPlane = 'inApparate'
        this.s1Section  = new SectionLine()
        this.outContact  = new Contact(this)
        this.s1Section.setStartContact(this.inContact)
        this.s1Section.setEndContact(this.inApparate.inContact)

        this.uniteSection  = new SectionLine()
        this.uniteSection.setStartContact(this.inApparate.outContact)
        this.uniteSection.setEndContact(this.outContact)
        
     
        this.uniteSection.nameOfPlane = 'uniteSection'
        this.uniteSection.description = 'uniteSection'
        this.uniteSection.isInPanel = true
        this.description = 'panel'
        this.inContact.description = 'panelInCont'
        this.outContact.description = 'panelOutCont'
        this.s1Section.nameOfPlane = 's1Section'
        this.s1Section.description = 's1Section'
        this.s1Section.isInPanel = true
    }
    outContact: Contact
    uniteSection: SectionLine;
    s1Section: SectionLine;
    inApparate: CommutateApparate;
    

    //#region bus
    private _bus: Bus = new Bus();
    public get bus(): Bus {
        return this._bus;
    }
    public set bus(v: Bus) {
        this._bus = v;
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

        this.s1Section.subSections.forEach(s =>{
           
            s.calc()
        } )

        this.s1Section.subDevices.forEach(d => {
            if (d instanceof CommutateApparate) {
                d.calc()
            }
        })
        
       

    
    

        this.calcColCables()
        this.calcColPipes()
    }

    public addFeeder() {
               
        addOneConsumerFeeder(this)
       
    }

    private calcColCables(){
        const cables = new Array<Cable>()
        this.uniteSection.subSections.forEach(s=>{
            if(!s.isInPanel){
                if(s.cable.length > 0){
                    cables.push(s.cable)
                }
            }
        })

        const sumCables: Array<Cable> = new Array<Cable>()
        cables.forEach(c=>{
            const cable = new Cable(this.uniteSection)
            cable.mark = c.mark
            cable.square = c.square
            cable.colCores = c.colCores

            cables.forEach(cab=>{
                if(cab.mark == cable.mark && cab.colCores == cable.colCores && cab.square == cable.square){
                    cable.length += cab.length
                }
            })

            let isSame = false

            sumCables.forEach(cab=>{
                if(cab.mark == cable.mark && cab.colCores == cable.colCores && cab.square == cable.square){
                    isSame = true
                }
            })

            if(!isSame) sumCables.push(cable)
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

    toJSON(){
        return Object.assign(super.toJSON(), {
            outContactId: this.outContact.id,
            s1SectionId: this.s1Section.id,
            uniteSectionId: this.uniteSection.id,
            inApparateId: this.inApparate.id,
            type: 'Panel'
        })
    }
}