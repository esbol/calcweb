


export enum Phase {
    A,
    B,
    C,
    ABC
}

export abstract class ELObject {
    id: number = Math.random()
    nameOfPlane: string = ''
    voltage: number = 220
    private _colPhase: number = 1

    
    public set colPhase(v : number) {
        if(v == 1) this.voltage = 220
        if(v == 3) this.voltage = 380
        this._colPhase = v;
        
        
    }
    
    
    public get colPhase() : number {
        return this._colPhase
    }
    

    description: string = ''

    constructor() { }

    abstract setDataFromDB(mark: string): boolean
}



