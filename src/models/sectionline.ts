import { Cable } from './cable';
import { Breaker } from './breaker';
import { Consumer } from "./consumer";
import { Contact } from "./contact";
import { CalculationMode } from "./calculationmode";

import { Device } from "./device";
import { CableEnviroment, CalculationModesNames } from "./normativs";

export class SectionLine {
    constructor() {
        this.calculationModes.push(new CalculationMode(CalculationModesNames[0], this))
    }
    id: number = Math.random()
    //#region colPhase

    private _colPhase: number = 1;
    public get colPhase(): number {
        return this._colPhase;
    }
    //#endregion

    //#region voltage
    private _voltage: number = 220;
    public get voltage(): number {
        return this._voltage;
    }
    public set voltage(v: number) {
        this._voltage = v;
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
    private _calculationModes: Array<CalculationMode> = new Array<CalculationMode>();
    public get calculationModes(): Array<CalculationMode> {
        return this._calculationModes;
    }
    //#endregion


    //#region modeMax
    private _modeMax: CalculationMode = this._calculationModes[0];
    public get modeMax(): CalculationMode {
        return this._modeMax;
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
        this.setSubSections()
        this.setSubDevices()
        this.setSubConsumers()
        this.setColPhase()

        this.setCalculationModes()
        this.setConsumersToCalcModes()

        this.calculationModes.forEach(m => {
            m.calc()
        })

        this.setModeMax()

        this._subSections.forEach(s => s.calc)
    }

    public setSubDevices(): void {
        this._subDevices.splice(0, this._subDevices.length)
        const devlist = this._subDevices
        const endContact = this.endContact

        if (endContact !== null) recurcy(endContact)

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
        return
    }

    public setSubConsumers(): void {
        this._subConsumers.splice(0, this._subConsumers.length)
        const conslist = this._subConsumers

        this.subDevices.forEach(d => {
            if (d instanceof Consumer && conslist.includes(d as Consumer) === false) {
                conslist.push(d as Consumer)
            }

        })


        return
    }

    public setCalculationModes(): void {
        //режимы каждого приемника
        const modes: string[] = [];
        if (this.subConsumers.length > 0) {

            this.subConsumers.forEach(c => {
                c.calculationModes.forEach(m => {
                    if (modes.includes(m) === false) {
                        modes.push(m.toLowerCase())
                    }
                })
            })

        }


        //добавляем отсутсвующие
        modes.forEach(m => {
            let exist: boolean = false
            this.calculationModes.forEach(cm => {
                if (cm.name === m) {
                    exist = true
                }
            })
            if (exist === false) {
                this.calculationModes.push(
                    new CalculationMode(m, this)
                )
            }
        })

        const forDel = new Array<CalculationMode>()
        this.calculationModes.forEach(cm => {
            if (modes.includes(cm.name) === false) {
                forDel.push(cm)
            }
        })
        forDel.forEach(cm => {
            this.calculationModes.splice(
                this.calculationModes.indexOf(cm), 1
            )
        })

    }

    private setModeMax(): void {
        let mMode = this.calculationModes[0]
        let cur = 0
        this._calculationModes.forEach(m => {
            if (m.current > cur) mMode = m
        })
        this._modeMax = mMode
    }

    private setConsumersToCalcModes(): void {
        this.calculationModes.forEach(cm => {
            cm.consumers = new Array<Consumer>()

            this.subConsumers.forEach(c => {
                if (c.calculationModes.includes(cm.name)) {
                    cm.consumers.push(c)
                }
            })

        })


    }

    public setStartContact(constact: Contact) {
        if (this._startContact !== null) {
            this._startContact.removeSection(this);
        }
        constact.addSection(this)
        this.startContact = constact
    }

    public setEndContact(contact: Contact) {
        if (this._endContact !== null) {
            this._endContact.removeSection(this)
        }
        contact.addSection(this)
        this.endContact = contact
    }

    private setSubSections(): void {
        this._subSections.splice(0, this._subSections.length)
        const subSec = this._subSections

        if (this._endContact !== null) recurcy(this._endContact)
        function recurcy(endContact: Contact): void {
            endContact.getSlaveSections().forEach(s => {
                if (subSec.includes(s) === false) {
                    subSec.push(s)
                }
                if (s.endContact !== null) recurcy(s.endContact)
            })
        }
    }


    private setColPhase(): void {
        let col:number = 1
        if (this.endContact !== null) {
            col = this.endContact.ownDevice.colPhase
        }
      
        this.subSections.forEach(s => {
           
            if (s.colPhase > col) {
                col = s.colPhase
            }
        })
        if(col == 1) this.voltage = 220
        if(col == 3) this.voltage = 380
        this._colPhase = col
    }
}