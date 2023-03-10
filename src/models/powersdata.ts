export class PowersData {
    constructor(){}

    //#region installPower
    private _installPower : number = 0;
    public get installPower() : number {return this._installPower;}
    public set installPower(v : number) {this._installPower = v;}
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
    public set cosf(v: number) { this._cosf = v; }
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





}