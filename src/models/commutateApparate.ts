import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";

export abstract class CommutateApparate extends Device {
    constructor(mark: string) {
        super()
        this.innerSection.nameOfPlane = 'innerSection'
        this.innerSection.setStartContact(this.inContact)
        this.innerSection.setEndContact(this.outContact)
        this.mark = mark

        
    }

    readonly outContact: Contact = new Contact(this)
    readonly innerSection: SectionLine = new SectionLine()

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
    //#endregion


    public calc(current: number = 0) {
       
        this.colPhase = this.innerSection.colPhase
      
        
       // console.log(this.innerSection);
        
        let cur = 0
       
        
        if (current == 0) cur = this.innerSection.modeMax.current
        else cur = current

  
        for (let index = 0; index < this._possibleCurrents.length; index++) {
            const element = this._possibleCurrents[index];
            if(element > cur){
                this._nominalCurrent = element
                break;
            }
            this._nominalCurrent = -1
        }
       


    }
}