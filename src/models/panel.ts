import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";
import { Feeder } from "./feeder";

export class Panel extends Device {
    setDataFromDB(mark: string): boolean {
       return true
    }
    constructor(){
        super()
        this.uniteSection.setEndContact(this.outContact)
        this.uniteSection.nameOfPlane = 'uniteSection'
        this.description = 'panel'
       
    }
    readonly outContact: Contact = new Contact(this)
    //#region feeders
    private _feeders: Array<Feeder> = new Array<Feeder>();
    public get feeders(): Array<Feeder>  {
        return this._feeders;
    }
    //#endregion
   
    
    //#region uniteSection
    private _uniteSection: SectionLine = new SectionLine();
    public get uniteSection(): SectionLine {
        return this._uniteSection;
    }
    //#endregion


    public calc(){
     
        this.feeders.forEach(f=>{
            f.calc()
        })
        this.uniteSection.calc()
    }

    public addFeeder(){
      
        this._feeders.push(new Feeder(this, this.outContact))
    
    }
}