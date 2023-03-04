import { CalculationModesNames } from './normativs';

import { Device } from "./device";
import { calcCurrentByInstallPower, calcQPower, calcSPower } from './formuls/calcpowers';





export class Consumer extends Device{
    constructor() {
        super()
        this.description = 'consumer'
        this._groupNameBySP = 'не указано'
    }

    //#region calculationModes
    private _calculationModes: Array<string> = [CalculationModesNames[0]];
    public get calculationModes(): Array<string> {
        return this._calculationModes;
    }
    public set calculationModes(v: Array<string>) {
        this._calculationModes = v;
    }
    //#endregion

    //#region groupNameBySP
    private _groupNameBySP: string = "";
    public get groupNameBySP(): string {
        return this._groupNameBySP;
    }
    public set groupNameBySP(v: string) {
        this._groupNameBySP = v;
    }
    //#endregion


    //#region count
    private _count : number= 1;
    public get count() : number {
        return this._count;
    }
    public set count(v : number) {
        this._count = v;
    }
    //#endregion

    //#region installPower
    private _installPower: number = 0;
    public get installPower(): number { return this._installPower; }
    public set installPower(v: number) { this._installPower = v; }
    //#endregion

    //#region ratedPower
    private _ratedPower: number = 0;
    public get ratedPower(): number { return this._ratedPower; }
    public set ratedPower(v: number) { this._ratedPower = v; }
    //#endregion

    //#region ratedQPower
    private _ratedQPower: number = 0;
    public get ratedQPower(): number { return this._ratedQPower; }
    public set ratedQPower(v: number) { this._ratedQPower = v; }
    //#endregion

    //#region ratedSPower
    private _ratedSPower: number = 0;
    public get ratedSPower(): number { return this._ratedSPower; }
    public set ratedSPower(v: number) { this._ratedSPower = v; }
    //#endregion

    //#region cosf
    private _cosf: number = 0.93;
    public get cosf(): number { return this._cosf; }
    public set cosf(v: number) 
    { 
        this._cosf = v; 
    }
    //#endregion

    //#region tgf
    private _tgf: number = 0;
    public get tgf(): number { return this._tgf; }
    public set tgf(v: number) { this._tgf = v; }
    //#endregion

    //#region current
    private _current: number = 0;
    public get current(): number { return this._current; }
    public set current(v: number) { this._current = v; }
    //#endregion

    //#region currentC
    private _currentC: number = 0;
    public get currentC(): number { return this._currentC; }
    public set currentC(v: number) { this._currentC = v; }
    //#endregion

    //#region currentB
    private _currentB: number = 0;
    public get currentB(): number { return this._currentB; }
    public set currentB(v: number) { this._currentB = v; }
    //#endregion

    //#region currentA
    private _currentA: number = 0;
    public get currentA(): number { return this._currentA; }
    public set currentA(v: number) { this._currentA = v; }
    //#endregion


    setDataFromDB(mark: string): boolean {
        return true
    }

    public calc(){
        this.current = calcCurrentByInstallPower(this.installPower, this.voltage, this.colPhase, this.cosf)
        this.ratedPower = this.installPower

        this._tgf = Math.tan(Math.acos(this.cosf))
   


        this.ratedQPower = calcQPower(this.ratedPower, this.tgf)
        this.ratedSPower = calcSPower(this.ratedPower, this.ratedQPower)
    }
}