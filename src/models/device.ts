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
    
    //#region colPhase
    private _colPhase: number = 1
    public set colPhase(v: number) {
        if(v == this._colPhase) return
        if (v == 1) this.voltage = 220
        if (v == 3) this.voltage = 380
        this._colPhase = v;
        this._supplyPanels.forEach(p=>p.calc())
    }
    public get colPhase(): number {
        return this._colPhase
    }
    //#endregion


    //#region supplyPanels
    private _supplyPanels: Array<Panel> = [];
    public get supplyPanels(): Array<Panel> {
        return this._supplyPanels;
    }
    public set supplyPanels(v: Array<Panel>) {
        this._supplyPanels = v;
    }
    //#endregion


}