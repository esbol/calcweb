
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
    private _supplyPanels: Array<Panel> = [];
    public get supplyPanels(): Array<Panel> {
        return this._supplyPanels;
    }
    public set supplyPanels(v: Array<Panel>) {
        this._supplyPanels = v;
    }
    //#endregion


    constructor() {
        //console.log('consrtuctor ' + this.modeMax);
        
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

    //#region cable
    private _cable: Cable = new Cable();
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

    public addContactor() {

        

        let endDevice: Device = new Consumer()
        if (this.endContact) endDevice = this.endContact.ownDevice
        
        
     
        let supplyContact: Contact = new Contact(new Consumer())
        let supplySection: SectionLine = new SectionLine()

      
        
        
        if (this.startContact) recurcy(this.startContact)
        function recurcy(contact: Contact) {
            contact.getSupplySections().forEach(s => {
                if (s.startContact) {
                    if (s.startContact.ownDevice instanceof Panel) {
                        supplyContact = s.startContact
                    } else {
                        recurcy(s.startContact)
                    }
                }
            })
        }

        supplyContact.getSlaveSections().forEach(s => {
            if (s.subSections.includes(this)) {
                supplySection = s

            }
        })


        const contactor = new Contactor(Contactors[0].mark)

        
        this.setEndContact(contactor.inContact)
       
       

       
        

        const sconsumer = new SectionLine()
        sconsumer.setStartContact(contactor.outContact)
        if (endDevice) sconsumer.setEndContact(endDevice.inContact)

        

        sconsumer.cable.mark = Cables[0].mark
        if (supplyContact != null) sconsumer.nameOfPlane = 'M' + (supplyContact.getSlaveSections().indexOf(supplySection) + 1).toString() + '-2'

        this.nameOfPlane = this.nameOfPlane + '-1'

        this.calc()
        
       
       



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