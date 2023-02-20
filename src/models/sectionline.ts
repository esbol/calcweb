import { Consumer } from "./consumer";
import { Contact } from "./contact";
import { CalculationMode } from "./calculationmode";

import { Device } from "./device";
import { CalculationModes } from "./normativs";

export class SectionLine {
    constructor(){
        this.calculationModes.push(new CalculationMode(CalculationModes[0]))
    }

    //#region colPhase
    private _colPhase : number  = 1;
    public get colPhase() : number {
        return this._colPhase;
    }
    public set colPhase(v : number) {
        this._colPhase = v;
    }
    //#endregion

    //#region description
    private _description : string = '';
    public get description() : string {
        return this._description;
    }
    public set description(v : string) {
        this._description = v;
    }
    //#endregion
    
    //#region nameOfPlane
    private _nameOfPlane : string = '';
    public get nameOfPlane() : string {
        return this._nameOfPlane;
    }
    public set nameOfPlane(v : string) {
        this._nameOfPlane = v;
    }
    //#endregion

    //#region startContact
    private _startContact : Contact | null = null;
    public get startContact() : Contact | null{
        return this._startContact;
    }
    public set startContact(v : Contact | null) {
        this._startContact = v;
    }
    //#endregion

    //#region endContact
    private _endContact: Contact | null = null;
    public get endContact(): Contact | null {
        return this._endContact;
    }
    public set endContact(v: Contact | null) {
        this._endContact = v;
    }
    //#endregion

    //#region calculationModes
    private _calculationModes: Array<CalculationMode> = new Array<CalculationMode>();
    public get calculationModes(): Array<CalculationMode>  {
        return this._calculationModes;
    }
    public set calculationModes(v: Array<CalculationMode>) {
        this._calculationModes = v;
    }
    //#endregion

    //#region subConsumers
    private _subConsumers: Array<Consumer> = new Array<Consumer>();
    public get subConsumers(): Array<Consumer> {
        return this._subConsumers;
    }
    public set subConsumers(v: Array<Consumer>) {
        this._subConsumers = v;
    }
    //#endregion

    //#region subDevices
    private _subDevices: Array<Device> = new Array<Device>();
    public get subDevices(): Array<Device> {
        return this._subDevices;
    }
    public set subDevices(v: Array<Device>) {
        this._subDevices = v;
    }
    //#endregion



    public calc(){
        this.subDevices = this.getSubDevices()
        this.subConsumers = this.getSubConsumers()
        this.setCalculationModes()
        this.setConsumersToCalcModes()


        this.calculationModes.forEach(m =>{
            m.calc()
        } )
     
      
    }

    public getSubDevices(): Array<Device> {
        const devlist = new Array<Device>()
        const endContact = this.endContact

        if(endContact !== null)recurcy(endContact)

        function recurcy(endC: Contact){
            if(devlist.includes(endC.ownDevice)===false){
                devlist.push(endC.ownDevice)
            }

            endC.sectionLines.forEach(s=>{
                if(s.startContact === endC){
                   if(s.endContact!== null) recurcy(s.endContact)
                }
            })
        }
        return devlist
    }

    public getSubConsumers(): Array<Consumer> {
        const conslist = new Array<Consumer>()
       
        this.subDevices.forEach(d=>{
            if(d instanceof Device && conslist.includes(d as Consumer) === false){
                conslist.push(d as Consumer)
            }
        })
       
        return conslist
    }

    public setCalculationModes(): void {
        //режимы каждого приемника
        const modes: string[] = [];
        this.subConsumers.forEach(c=>{
            c.calculationModes.forEach(m =>{
                if(modes.includes(m) === false){
                    modes.push(m.toLowerCase())
                }
            })
        })
            
        //добавляем отсутсвующие
        modes.forEach(m=>{
            let exist: boolean = false
            this.calculationModes.forEach(cm=>{
                if(cm.name === m){
                    exist = true
                } 
            })
            if(exist === false) {
                this.calculationModes.push(
                    new CalculationMode(m)
                )
            }
        })

        const forDel = new Array<CalculationMode>()
        this.calculationModes.forEach(cm=>{
            if(modes.includes(cm.name)===false){
                forDel.push(cm)
            }
        })
        forDel.forEach(cm=>{
            this.calculationModes.splice(
                this.calculationModes.indexOf(cm), 1
            )
        })

    }

    private setConsumersToCalcModes(): void {
        this.calculationModes.forEach(cm=>{
            cm.consumers = new Array<Consumer>()

            this.subConsumers.forEach(c=>{
                if(c.calculationModes.includes(cm.name)){
                    cm.consumers.push(c)
                }
            })
          
        })
     

    }

    public setStartContact(constact: Contact){
        if(this._startContact !== null){
            this._startContact.removeSection(this);
        }
        constact.addSection(this)
        this.startContact = constact
    }

    public setEndContact(contact: Contact) {
        if(this._endContact !== null){
            this._endContact.removeSection(this)
        }
        contact.addSection(this)
        this.endContact = contact
    }
}