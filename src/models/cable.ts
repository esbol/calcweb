import { Cables, ICable } from './bd/cables';
import { SectionLine } from './sectionline';
import { CableMaterial, ICableCurrentPUE, PUECurrents, CableEnviroment } from './normativs';
import { ELObject } from "./elobject";
import { CommutateApparate } from './commutateApparate';

export class Cable extends ELObject {
    setDataFromDB(mark: string): boolean {
       const cab: ICable | undefined = Cables.find(c=> c.mark) 
        if(cab != undefined){
            this.possibleSquares = cab.possibleSquares
            this.material = cab.material
            return true
        }else return false
    }

    constructor() {
        super()
    }

    // //#region safetyApparate
    // private _safetyApparate : CommutateApparate | null = null;
    // public get safetyApparate(): CommutateApparate | null {
    //     return this._safetyApparate;
    // }
    // public set safetyApparate(v: CommutateApparate | null) {
    //     this._safetyApparate = v;
    // }
    // //#endregion

    //#region square
    private _square: number = 1.5;
    public get square(): number {
        return this._square;
    }
    //#endregion

    //#region colCores
    private _colCores: number = 3;
    public get colCores(): number {
        return this._colCores;
    }
    //#endregion

    //#region mark
    private _mark: string = '';
    public get mark(): string {
        return this._mark;
    }
    public set mark(v: string) {
        this._mark = v;
    }
    //#endregion

    //#region material
    private _material: CableMaterial = CableMaterial.Медь;
    public get material(): CableMaterial {
        return this._material;
    }
    public set material(v: CableMaterial) {
        this._material = v;
    }
    //#endregion

    //#region possibleSquares
    private _possibleSquares: Array<number> = [1.5, 2.5, 4, 6];
    public get possibleSquares(): Array<number> {
        return this._possibleSquares;
    }
    public set possibleSquares(v: Array<number>) {
        this._possibleSquares = v;
    }
    //#endregion


    //#region maxCurrent
    private _maxCurrent: number = 0;
    public get maxCurrent(): number {
        return this._maxCurrent;
    }
    public set maxCurrent(v: number) {
        this._maxCurrent = v;
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

    public calc(section: SectionLine, breakerCurrent: number) {

        this.setColCores(section)
       
        //сечение по номиналу автомата
        let cableData: ICableCurrentPUE | null = this.getPUESquare(breakerCurrent, section.enviroment)

       
        
        if(cableData != null){
            this._maxCurrent = cableData.current
            this._square = cableData.square
        }
        
    

    }


    private getPUESquare(current: number, env: CableEnviroment): ICableCurrentPUE | null {
        let cableData: ICableCurrentPUE |null = null

        
        
        for (let index = 0; index < PUECurrents.length; index++) {
            const el = PUECurrents[index];
            if (el.current > current
                && el.colCores === this._colCores - 2
                && el.enviroment === env
                && el.material === this._material) {
                cableData = el
               
                break
            }
        }
        return cableData
    }

    private setColCores(section: SectionLine) {
        section.colPhase === 1 ? this._colCores = 3 : this._colCores = 5
    }



}