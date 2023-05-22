import { Consumer } from "./consumer";
import { HasId } from "./hasid";

export class GroupBySP extends HasId {
    constructor(groupName: string = '') {
        super()
        this.groupName = groupName
        this.type = 'GroupBySP'
    }



    //#region groupName
    private _groupName: string = '';
    public get groupName(): string { return this._groupName; }
    public set groupName(v: string) { this._groupName = v; }
    //#endregion

    //#region consumers
    public readonly consumers: Array<Consumer> = new Array<Consumer>();

    //#endregion

    //#region consumersCount
    private _consumersCount: number = 0;
    public get consumersCount(): number { return this._consumersCount; }
    public set consumersCount(v: number) { this._consumersCount = v; }
    //#endregion

    //#region kSprosa
    private _kSprosa: number = 1;
    public get kSprosa(): number { return this._kSprosa; }
    public set kSprosa(v: number) { this._kSprosa = v; }
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


    public setConsumers(val: Array<Consumer>) {
        val.forEach(c => {
            if (this.consumers.includes(c) === false) {
                this.consumers.push(c)
            }
        })
        const forDel = new Array<Consumer>()
        this.consumers.forEach(cons => {
            if (val.includes(cons) === false) {
                forDel.push(cons)
            }
        })

        forDel.forEach(f => this.consumers.splice(
            this.consumers.indexOf(f), 1
        ))
    }

    public calc(): void {

        this.consumersCount = 0
        let i = 0
        let r = 0
        let q = 0
        let s = 0
        this.consumers.forEach(c => {
            if (c.isReserve == false) {
                c.calc()
                i += c.installPower
                r += c.ratedPower
                q += c.ratedQPower
                s += c.ratedSPower
                this.consumersCount += c.count
            }

        });
        this.installPower = i
        this.ratedPower = r * this.kSprosa
        this.ratedQPower = q * this.kSprosa
        this.ratedSPower = s * this.kSprosa
    }
    // toJSON() {
    //     return {
    //         id: this.id,
    //         groupName: this.groupName,
    //         consumersCount: this.consumersCount,
    //         kSprosa: this.kSprosa,
    //         installPower: this.installPower,
    //         ratedPower: this.ratedPower,
    //         ratedQPower: this.ratedQPower,
    //         ratedSPower: this.ratedSPower,
    //     }
    // }
}