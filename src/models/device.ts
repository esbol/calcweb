
import { Breaker } from "./breaker";
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

    public getSupplyPanels(): Array<Panel> {
        const spanels: Array<Panel> = new Array<Panel>()
        recurcy(this.inContact)
        function recurcy(contact: Contact){
            contact.getSupplySections().forEach(s=>{
                if(s.startContact != null){       
                    if(s.startContact.ownDevice.constructor.name == 'Panel'){
                        if(!spanels.includes(s.startContact.ownDevice as Panel)){
                            spanels.push(s.startContact.ownDevice as Panel)
                        }
                    }else{
                        recurcy(s.startContact)
                    }
                }
            })
        }
        return spanels
    }
    //#endregion

}