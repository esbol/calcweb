import { ELObject } from "./elobject";
import { Device } from "./device"
import { SectionLine } from "./sectionline";
import { Consumer } from "./consumer";

export class Contact extends ELObject{
    setDataFromDB(mark: string): boolean {
        return true
    }
     //#region ownDevice
     private _ownDevice : Device ;
     public get ownDevice() : Device {
         return this._ownDevice;
     }
     public set ownDevice(v : Device) {
         this._ownDevice = v;
     }
     //#endregion
    
    constructor(device: Device){
        super()
        this._ownDevice = device
    }

    
    //#region sectionLines
    public readonly sectionLines: Array<SectionLine> = new Array<SectionLine>();
    //#endregion

    public getSupplySections():Array<SectionLine>{
        const supplys = new Array<SectionLine>()
        this.sectionLines.forEach(s=>{
            if(s.endContact === this){
                supplys.push(s)
            }
            
        })

        return supplys
    }

    public getSlaveSections(): Array<SectionLine> {
        const supplys = new Array<SectionLine>()
        this.sectionLines.forEach(s => {
            if (s.startContact === this) {
                supplys.push(s)
            }

        })

        return supplys
    }

    public addSection(section: SectionLine): void {
        if(this.sectionLines.includes(section)===false){
            this.sectionLines.push(section)
        }
    }

    public removeSection(section: SectionLine): void {
        this.sectionLines.splice(
            this.sectionLines.indexOf(section), 1
        )
    }

    toJSON(){
        const sectionsIds = new Array<number>()
        this.sectionLines.forEach(s=> sectionsIds.push(s.id))
        return Object.assign(super.toJSON(), {
            ownDeviceId: this.ownDevice.id,
            sectionsIds: sectionsIds,
        })
    }
}