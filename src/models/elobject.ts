import { SpecData } from "./SpecData";
import { CommutateApparate } from "./commutateApparate";
import { HasId } from "./hasid";



export enum Phase {
    A,
    B,
    C,
    ABC
}

export abstract class ELObject extends HasId {
   
    nameOfPlane: string = 'a'


    //#region colPhase
    private _colPhase: number = 1
    public set colPhase(v: number) {
        if (v == this._colPhase) return
        this._colPhase = v;
        // if(this instanceof CommutateApparate){
        //     const ca = this as CommutateApparate
        //     ca.innerSection.colPhase = v
        // }
    }
    public get colPhase(): number {
        return this._colPhase
    }
    //#endregion

    //#region voltage
    public get voltage(): number {
        return this._colPhase == 1 ? 220 : 380
    }
    //#endregion

    description: string = ''

    constructor() { super() }
    
    abstract setDataFromDB(mark: string): boolean

    
}



