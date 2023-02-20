import { ELObject } from "./elobject";
import { Device } from "./device"
import { SectionLine } from "./sectionline";

export class Contact extends ELObject{
    readonly ownDevice: Device
   
    constructor(device: Device){
        super()
        this.ownDevice = device
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
}