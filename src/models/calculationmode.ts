
import { Consumer } from './consumer';
import { GroupBySP } from './groupbysp';
import { calcCurrentBySPower } from './formuls/calcpowers'

export class CalculationMode {
    constructor(name: string){
        this.name = name
    }
   
    //#region name
    private _name : string = 'Normal';
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    //#endregion

    //#region consumers
    private _consumers: Array<Consumer> = new Array<Consumer>()
    public get consumers(): Array<Consumer> {
        return this._consumers;
    }
    public set consumers(v: Array<Consumer>) {
        this._consumers = v;
    }
    //#endregion

    //#region groupsBySPList
    private _groupsBySPList: Array<GroupBySP> = new Array<GroupBySP>()
    public get groupsBySPList(): Array<GroupBySP> {
        return this._groupsBySPList;
    }
    public set groupsBySPList(v: Array<GroupBySP>) {
        this._groupsBySPList = v;
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

    //#region voltage
    private _voltage : number = 220;
    public get voltage() : number {
        return this._voltage;
    }
    public set voltage(v : number) {
        this._voltage = v;
    }
    //#endregion

    //#region colPhase
    private _colPhase: number = 1
    public set colPhase(v: number) {
        if (v === 1) this.voltage = 220
        if (v === 3) this.voltage = 380
        this._colPhase = v;
    }
    public get colPhase(): number {
        return this._colPhase
    }
    //#endregion


    public calc(){
        this.setGroupsBySP()
        this.groupsBySPList.forEach(g => g.calc())
        this.calcPowers()
    }

    private setGroupsBySP():void {

        //добавляем группу если ее нет
         this.consumers.forEach(c => {
            let group = this.groupsBySPList.find(g=> g.groupName === c.groupNameBySP) 
            if(group === undefined){
               this.groupsBySPList.push(new GroupBySP(c.groupNameBySP))
            }
        });
        //список групп для удаления
        const forDel = new Array<GroupBySP>()
        this.groupsBySPList.forEach(g => {
            const consumer = this.consumers.find(cons => cons.groupNameBySP === g.groupName)
            if(consumer === undefined) forDel.push(g)
        })
        forDel.forEach(g=> this.groupsBySPList.splice(
            forDel.indexOf(g), 1
        ))

        //добавляем нагрузку на каждую группу
        this.groupsBySPList.forEach(g => {
            const consumerlist = this.consumers.filter(c => c.groupNameBySP === g.groupName)
            g.setConsumers(consumerlist)
        })



        // //добавляем нагрузку на соответствующую группу или создаем новую
        // this.consumers.forEach(c => {
        //     let group = this.groupsBySPList.find(g=> g.groupName === c.groupNameBySP) 
        //     if(group !== undefined){
        //         if(group.consumers.includes(c) === false) group.consumers.push(c)
        //     }else{
        //         const newgroup = new GroupBySP()
        //         newgroup.consumers.push(c)
        //         newgroup.groupName = c.groupNameBySP
        //         this.groupsBySPList.push(newgroup)
        //     }
        // });
        // //список групп для удаления
        // const forDel = new Array<GroupBySP>()
        // this.groupsBySPList.forEach(g => {
        //     const consumer = this.consumers.find(cons => cons.groupNameBySP === g.groupName)
        //     if(consumer === undefined) forDel.push(g)
        // })
        // forDel.forEach(g=> this.groupsBySPList.splice(
        //     forDel.indexOf(g), 1
        // ))

        // //список нагрузок для удаления
        // this.groupsBySPList.forEach(g => {
        //     const forDelCons = new Array<Consumer>()
        //     g.consumers.forEach(c => {
        //         if(this.consumers.includes(c) === false) forDelCons.push(c)
        //     })
        //     forDelCons.forEach(c => {
        //         g.consumers.splice(
        //             forDelCons.indexOf(c), 1
        //         )
        //     })
        // })

        // //удаляем дубликаты нагрузок
        // this.groupsBySPList.forEach(g => {
        //     const fordelcons = new Array<Consumer>()
        //     g.consumers.forEach(c=>)
        // })
    }

    private calcPowers(){
        this.installPower = 0
        this.ratedPower = 0
        this.ratedQPower = 0

        this.groupsBySPList.forEach(g=>{
            this.installPower += g.installPower
            this.ratedPower += g.ratedPower
            this.ratedQPower += g.ratedQPower
        })

        if(this.ratedPower !== 0){
            this.tgf = this.ratedQPower / this.ratedPower
        }

        this.cosf = Math.acos(this.tgf)

        this.current = calcCurrentBySPower(this.ratedSPower, this.voltage, this.colPhase)
    }

}