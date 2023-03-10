import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";
import { Feeder } from "./feeder";
import { CommutateApparate } from './commutateApparate';
import { Bus } from './bus';

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

    //#region inApparate
    private _inApparate: CommutateApparate | null = null;
    public get inApparate(): CommutateApparate | null {
        return this._inApparate;
    }
    public set inApparate(v: CommutateApparate | null) {
        this._inApparate = v;
    }
    //#endregion

    //#region bus
    private _bus: Bus = new Bus();
    public get bus(): Bus  {
        return this._bus;
    }
    public set bus(v: Bus) {
        this._bus = v;
    }
    //#endregion

    public calc(){
     
        this.feeders.forEach(f=>{
            f.calc()
        })
        this.uniteSection.calc()

        this._uniteSection.subSections.forEach(s=>{
            if(!s.supplyPanels.includes(this)){
                s.supplyPanels.push(this)
            }
        } )
        this._uniteSection.subDevices.forEach(d=>{
            if (!d.supplyPanels.includes(this)) {
                d.supplyPanels.push(this)
            }
        })
        
    }

    public addFeeder(){
      
        this._feeders.push(new Feeder(this, this.outContact))
        this.calc()
    }
}