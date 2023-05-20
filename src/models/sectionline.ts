
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
import { Pipe } from './pipe';
import { HasId } from './hasid';


export class SectionLine extends HasId {

    //#region supplyPanels

    public getSupplyPanels(): Array<Panel>{
        const spanels: Array<Panel> = new Array<Panel>()
        if(this.startContact != null) recurcy(this.startContact)
        function recurcy(contact: Contact) {
            contact.getSupplySections().forEach(s => {
                if (s.startContact != null) {
                    if(s.startContact.ownDevice != null)
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
        super()
    }
 


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
    public set calculationModes(v: Array<CalculationMode>) {
        this._calculationModes = v;
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
            if(endC.ownDevice != null)
            if (devlist.includes(endC.ownDevice) === false) {
                if(endC.ownDevice instanceof CommutateApparate){
                    const coma = endC.ownDevice as CommutateApparate
                    if(endC != coma.outContact){
                        devlist.push(endC.ownDevice) 
                    }
                }else{
                    devlist.push(endC.ownDevice)
                }
                
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
    
    //#region pipe
    private _pipe: Pipe = new Pipe(this);
    public get pipe(): Pipe {
        return this._pipe;
    }
    public set pipe(v: Pipe) {
        this._pipe = v;
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

    // toJSON(){
    //     let ids = new Array<string>()
    //     this.calculationModes.forEach(m=>ids.push(m.id.toString()))
    //     let subConsumersIds = new Array<string>()
    //     this.subConsumers.forEach(m=>subConsumersIds.push(m.id.toString()))
    //     return {
    //         id: this.id,
    //         calculationModesIds: ids,
    //         isInPanel: this.isInPanel,
    //         colPhase: this.colPhase,
    //         length: this.length,
    //         nameOfPlane: this.nameOfPlane,
    //         description: this.description,
    //         startContactId: this.startContact?.id,
    //         endContactId: this.endContact?.id,
    //         cableId: this.cable.id,
    //         pipeId: this.pipe.id,
    //         enviroment: this.enviroment,
    //         modeMaxId:this.modeMax.id,
    //         subConsumersIds: subConsumersIds
    //     }
    // }

}