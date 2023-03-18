
import { Contact } from "./contact";
import { ELObject } from "./elobject";
import { Panel } from "./panel";




export abstract class Device extends ELObject {
    //#region consructor 

    constructor() {
        super()
    }
    //#endregion
   
    readonly inContact: Contact = new Contact(this)
    
    //#region Mark

    private _mark: string = ''
    public get mark(): string {
        return this._mark
    }
    public set mark(v: string) {
        if (this.setDataFromDB(v)) {
            this._mark = v;
        } else {
            console.log("Не удалось получить данные SetDataFromDB")
        }

    }

    //#endregion 
    
 


    //#region supplyPanels

    
    private _supplyPanels : Array<Panel> = []
    public get supplyPanels(): Array<Panel> {
        return this._supplyPanels;
    }
    public set supplyPanels(v: Array<Panel>) {
        this._supplyPanels = v;
    }
    
    //#endregion

}