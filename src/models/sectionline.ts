
import { Cable } from './cable';
import { Breaker } from './breaker';
import { Consumer } from "./consumer";
import { Contact } from "./contact";
import { CalculationMode } from "./calculationmode";

import { Device } from "./device";
import { CableEnviroment, CalculationModesNames } from "./normativs";
import { Panel } from './panel';
import { CommutateApparate } from './commutateApparate';
import { calc } from './formuls/calcsection'
import { Cables } from './bd/cables';
import { Contactor } from './contactor';
import { Contactors } from './bd/contactors';


export class SectionLine {

    //#region supplyPanels

    public getSupplyPanels(): Array<Panel>{
        const spanels: Array<Panel> = new Array<Panel>()
        if(this.startContact != null) recurcy(this.startContact)
        function recurcy(contact: Contact) {
            contact.getSupplySections().forEach(s => {
                if (s.startContact != null) {
                    if (s.startContact.ownDevice.constructor.name == 'Panel') {
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


    constructor() {
        
    }
    id: number = Math.random()


    //#region isInPanel
    private _isInPanel: boolean = false;
    public get isInPanel(): boolean {
        return this._isInPanel;
    }
    public set isInPanel(v: boolean) {
        this._isInPanel = v;
    }
    //#endregion

    //#region colPhase

    private _colPhase: number = 1;
    public get colPhase(): number {
        return this._colPhase;
    }
    public set colPhase(v: number) {
        if(v == this._colPhase) return
        this._colPhase = v;

    }
    //#endregion

    //#region voltage
    public get voltage(): number {
        if(this.colPhase == 1) return 220;
        else return 380
    }
    //#endregion

    //#region length
    private _length: number = 0;
    public get length(): number {
        return this._length;
    }
    public set length(v: number) {
        this._length = v;
    }
    //#endregion

    //#region description
    private _description: string = '132';
    public get description(): string {
        return this._description;
    }
    public set description(v: string) {
        this._description = v;
    }
    //#endregion

    //#region nameOfPlane
    private _nameOfPlane: string = '';
    public get nameOfPlane(): string {
        return this._nameOfPlane;
    }
    public set nameOfPlane(v: string) {
        this._nameOfPlane = v;
    }
    //#endregion

    //#region startContact
    private _startContact: Contact | null = null;
    public get startContact(): Contact | null {
        return this._startContact;
    }
    public set startContact(v: Contact | null) {
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
    private _calculationModes: Array<CalculationMode> = [new CalculationMode(CalculationModesNames[0], this)];
    public get calculationModes(): Array<CalculationMode> {
        return this._calculationModes;
    }
    //#endregion


    //#region modeMax
    private _modeMax: CalculationMode = this._calculationModes[0];
    public get modeMax(): CalculationMode {
        return this._modeMax;
    }
    public set modeMax(v: CalculationMode) {
        this._modeMax = v;
    }
    //#endregion

    //#region subConsumers
    public get subConsumers(): Array<Consumer> {

        
        const conslist = new Array<Consumer>()

        this.subDevices.forEach(d => {
            if (d instanceof Consumer && conslist.includes(d as Consumer) === false) {
                conslist.push(d as Consumer)
            }

        })

        return conslist
    }
    //#endregion

    //#region subDevices

    public get subDevices(): Array<Device> {


        const devlist = new Array<Device>()
      

        if (this.endContact !== null) recurcy(this.endContact)

        function recurcy(endC: Contact) {
            if (devlist.includes(endC.ownDevice) === false) {
                devlist.push(endC.ownDevice)
            }

            endC.sectionLines.forEach(s => {
                if (s.startContact === endC) {
                    if (s.endContact !== null) recurcy(s.endContact)
                }
            })
        }

        return devlist
    }
    //#endregion

    //#region subSections
   
    public get subSections(): Array<SectionLine> {

    
        const subSec = new Array<SectionLine>()

        if (this.endContact !== null) recurcy(this.endContact)
        function recurcy(endContact: Contact): void {
            endContact.getSlaveSections().forEach(s => {
                if (subSec.includes(s) === false) {
                    subSec.push(s)
                }
                if (s.endContact !== null) recurcy(s.endContact)
            })
        }



        return subSec
    }
    //#endregion

    //#region cable
    private _cable: Cable = new Cable(this);
    public get cable(): Cable {
        return this._cable;
    }
    public set cable(v: Cable) {
        this._cable = v;
    }
    //#endregion

    //#region enviroment
    private _enviroment: CableEnviroment = CableEnviroment.Air;
    public get enviroment(): CableEnviroment {
        return this._enviroment;
    }
    public set enviroment(v: CableEnviroment) {
        this._enviroment = v;
    }
    //#endregion

    public calc() {
        calc(this)      
    }

   

   

    public setStartContact(constact: Contact) {
        if (this.startContact !== null) {
            this.startContact.removeSection(this);
        }
        constact.addSection(this)
        this.startContact = constact
    }

    public setEndContact(contact: Contact) {
        if (this.endContact !== null) {
            this.endContact.removeSection(this)
        }
        contact.addSection(this)
        this.endContact = contact
    }

}