
import { IState } from "@/store";
import { SpecData } from "./SpecData";
import { Breaker } from "./breaker";
import { Contact } from "./contact";
import { ELObject } from "./elobject";
import { Panel } from "./panel";





export abstract class Device extends ELObject {
    //#region consructor 

    constructor() {
        super()
        this.type = 'Device'
    }
    //#endregion

    inContact: Contact = new Contact(this)

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

    //#region deltaU
    private _deltaU: number = 0;
    public get deltaU(): number {
        return this._deltaU;
    }
    public set deltaU(v: number) {
        this._deltaU = v;
    }
    //#endregion

    //#region allowDeltaU
    private _allowDeltaU: number = 3;
    public get allowDeltaU(): number { return this._allowDeltaU; }
    public set allowDeltaU(v: number) {
        if (v === this._allowDeltaU) return
        this._allowDeltaU = v;
    }
    //#endregion


    //#region getSupplyPanels

    public getSupplyPanels(): Array<Panel> {
        const spanels: Array<Panel> = new Array<Panel>()
      
        recurcy(this.inContact)
        function recurcy(contact: Contact) {
            contact.getSupplySections().forEach(s => {
                if (s.startContact != null) {
                    if (s.startContact.ownDevice != null)
                        if (s.startContact.ownDevice.type == "Panel") {
                        //    const isTypePanel =  s.startContact.ownDevice instanceof Panel
                        //    console.log(isTypePanel);
                           
                            if (!spanels.includes(s.startContact.ownDevice as Panel)) {
                                spanels.push(s.startContact.ownDevice as Panel)
                            }
                        } else {
                            recurcy(s.startContact)
                        }
                }
            })
        }
        return spanels
    }
    //#endregion
    //#region specData
    private _specData: SpecData = new SpecData('', '', '', '', '', '', '', '');
    public get specData(): SpecData {
        return this._specData;
    }
    public set specData(v: SpecData) {
        this._specData = v;
    }
    //#endregion


    // toJSON() {
    //     return Object.assign(super.toJSON(), {
    //         inContactId: this.inContact.id,
    //         mark: this.mark,
    //         deltaU: this.deltaU,
    //         allowDeltaU: this.allowDeltaU,
    //         specData: {
    //             factory: this.specData.factory,
    //             position: this.specData.position,
    //             description: this.specData.description,
    //             mark: this.specData.mark,
    //             code: this.specData.code,
    //             units: this.specData.units,
    //             count: this.specData.count,
    //             mass: this.specData.mass,
    //             note: this.specData.note,
    //         }
    //     })
    // }

}