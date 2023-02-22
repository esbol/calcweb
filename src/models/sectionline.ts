import { Breaker } from './breaker';
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
    private _description : string = '132';
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
    //#endregion

    //#region subDevices
    private _subDevices: Array<Device> = new Array<Device>();
    public get subDevices(): Array<Device> {
        return this._subDevices;
    }
    //#endregion

    //#region subSections
    private _subSections: Array<SectionLine> = new Array<SectionLine>();
    public get subSections(): Array<SectionLine> {
        return this._subSections;
    }
    //#endregion


    public calc(){
        this.setSubSections()
        this.setSubDevices()
        this.setSubConsumers()
        this.setCalculationModes()
        this.setConsumersToCalcModes()

        this.calculationModes.forEach(m =>{
            m.calc()
        } )
        this._subSections.forEach(s=> s.calc)
    }

    public setSubDevices(): void {
        this._subDevices.splice(0, this._subDevices.length)
        const devlist = this._subDevices
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
        return 
    }

    public setSubConsumers(): void {
        this._subConsumers.splice(0, this._subConsumers.length)
        const conslist = this._subConsumers
       
        this.subDevices.forEach(d=>{
            if(d instanceof Consumer && conslist.includes(d as Consumer) === false){
                conslist.push(d as Consumer)
            }
            
        })
       

        return
    }

    public setCalculationModes(): void {
        //режимы каждого приемника
        const modes: string[] = [];
        if(this.subConsumers.length > 0){
            
            this.subConsumers.forEach(c => {
                c.calculationModes.forEach(m => {
                    if (modes.includes(m) === false) {
                        modes.push(m.toLowerCase())
                    }
                })
            })

        }
        
            
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

    private setSubSections(): void{
        this._subSections.splice(0, this._subSections.length)
        const subSec = this._subSections

        if (this._endContact !== null) recurcy(this._endContact)
        function recurcy(endContact: Contact): void{
            endContact.getSlaveSections().forEach(s=>{
                if(subSec.includes(s) === false){
                    subSec.push(s)
                }
              if(s.endContact !== null)  recurcy(s.endContact)
            })
        }
    }
}