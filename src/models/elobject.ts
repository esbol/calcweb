import { CommutateApparate } from "./commutateApparate";



export enum Phase {
    A,
    B,
    C,
    ABC
}

export abstract class ELObject {
    id: number = Math.random()
    nameOfPlane: string = 'a'

  
    //#region colPhase
    private _colPhase: number = 1
    public  set colPhase(v: number) {
        if (v == this._colPhase) return
        this._colPhase = v;
        if(this instanceof CommutateApparate){
            const ca = this as CommutateApparate
            ca.innerSection.colPhase = v
        }
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

    constructor() {  }

    abstract setDataFromDB(mark: string): boolean

    toJSON(){
        return {
            id: this.id,
            colPhase: this.colPhase,
            nameOfPlane: this.nameOfPlane,
            description: this.description
        }
    }
}



