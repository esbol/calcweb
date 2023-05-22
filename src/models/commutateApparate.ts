import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";

export abstract class CommutateApparate extends Device {
    constructor(mark?: string) {
        super()
        const inner = new SectionLine()
        inner.nameOfPlane = 'innerSection'
        inner.description = 'inner'
        inner.setStartContact(this.inContact)
        inner.setEndContact(this.outContact)
        this.type = 'CommutateApparate'
        if(mark != undefined) this.mark = mark
    }

    outContact: Contact = new Contact(this)

    //#region innerSection
    public get innerSection(): SectionLine {
        return this.inContact.getSlaveSections()[0];
    }
    //#endregion

    //#region possibleCurrents
    protected _possibleCurrents: Array<number> = [0]
    public get possibleCurrents(): Array<number> {
        return this._possibleCurrents;
    }

    public set possibleCurrents(v: Array<number>) {
        this._possibleCurrents = v
    }

    //#endregion

    
    //#region nominalCurrent
    protected _nominalCurrent: number = 0
    public get nominalCurrent(): number {
        return this._nominalCurrent;
    }
    public set nominalCurrent(v: number) {
        this._nominalCurrent = v
    }
    //#endregion

    public isInApparate: boolean = false

    public calc() {
        
        this.colPhase = this.innerSection.colPhase

     
        

      
      
        
        
        let cur = this.innerSection.modeMax.current
        this.innerSection.subSections.forEach(s=>{
            if(s.modeMax.current > cur) cur = s.modeMax.current
        })

        if(this.isInApparate) {
            if(cur < 25 ){
                cur = 24
            }
        }
        
        for (let index = 0; index < this._possibleCurrents.length; index++) {
            const element = this._possibleCurrents[index];
            if(element > cur){
                this._nominalCurrent = element
                break;
            }
            this._nominalCurrent = -1
        }
       
       
    }

    // toJSON(){
    //     return Object.assign(super.toJSON(), {
    //         outContactId: this.outContact.id,
    //         nominalCurrent: this.nominalCurrent,
    //         innerSectionId: this.innerSection.id
    //     })
    // }
}