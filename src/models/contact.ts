import { ELObject } from "./elobject";
import { Device } from "./device"
import { SectionLine } from "./sectionline";
import { Consumer } from "./consumer";

export class Contact extends ELObject{
    setDataFromDB(mark: string): boolean {
        return true
    }
     //#region ownDevice
     private _ownDevice : Device | null = null ;
     public get ownDevice() : Device | null{
         return this._ownDevice;
     }
     public set ownDevice(v : Device | null) {
         this._ownDevice = v;
     }
     //#endregion
    
    constructor(device?: Device){
        super()
        this.type = 'Contact'
        if(device != undefined) this._ownDevice = device
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
    // toJSON(){
    //     let supplySectionsIds = new Array<string>()
    //     this.getSupplySections().forEach(m=>supplySectionsIds.push(m.id.toString()))
    //     let slaveSectionsIds = new Array<string>()
    //     this.getSlaveSections().forEach(m=>slaveSectionsIds.push(m.id.toString()))
    //     return Object.assign(super.toJSON(), {
    //         ownDeviceId: this.ownDevice?.id,
    //         supplySectionsIds: supplySectionsIds,
    //         slaveSectionsIds: slaveSectionsIds

    //     })
    // }
    
}