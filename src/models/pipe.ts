import { Breaker } from './breaker';
import { Cables, ICable } from './bd/cables';
import { SectionLine } from './sectionline';
import { CableMaterial, ICableCurrentPUE, PUECurrents, CableEnviroment, PipeMaterial, IPipeDiametr, PipeDiametrs } from './normativs';
import { ELObject } from "./elobject";
import { CommutateApparate } from './commutateApparate';
import { Contact } from './contact';
import { IPipe, Pipes } from './bd/pipes';
import { SpecData } from './SpecData';

export class Pipe extends ELObject {
    setDataFromDB(mark: string): boolean {
        const pipe: IPipe | undefined = Pipes.find(c => c.mark == mark)
        if (pipe != undefined) {
            this.possibleDiametrs = pipe.possibleDiametrs
            this.material = pipe.material
            this.specData = pipe.specData
            return true
        } else return false
    }

    constructor(section: SectionLine) {
        super()
        this._sectionLine = section
    }

    //#region sectionLine
    private _sectionLine: SectionLine
    public get sectionLine(): SectionLine {
        return this._sectionLine;
    }
    public set sectionLine(v: SectionLine) {
        this._sectionLine = v;
    }
    //#endregion

    //#region diametr
    private _diametr: number = 1.5;
    public get diametr(): number {
        return this._diametr;
    }
    public set diametr(v: number) {
        this._diametr = v;
    }
    //#endregion

 

    //#region mark
    private _mark: string = Pipes[0].mark;
    public get mark(): string {
        return this._mark;
    }
    public set mark(v: string) {
        if(this.setDataFromDB(v))
        this._mark = v;
    }
    //#endregion

    //#region material
    private _material: PipeMaterial = PipeMaterial.ПВХ
    public get material(): PipeMaterial {
        return this._material;
    }
    public set material(v: PipeMaterial) {
        this._material = v;
    }
    //#endregion

    //#region possibleDiametrs
    private _possibleDiametrs: Array<number> = [16, 20, 25, 32, 40, 50, 63];
    public get possibleDiametrs(): Array<number> {
        return this._possibleDiametrs;
    }
    public set possibleDiametrs(v: Array<number>) {
        this._possibleDiametrs = v;
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

    public calc() {

        if (this.sectionLine.isInPanel) return
        
        const cable = this.sectionLine.cable

        const ipipe: IPipeDiametr| undefined = PipeDiametrs.find(p=>p.cableColCores == cable.colCores && p.cableSquare == cable.square)

        if(ipipe != undefined) this.diametr = ipipe.diametr


    }

    toJSON(){
        return Object.assign(super.toJSON(), {
            
            mark: this.mark,
            diametr: this.diametr,
            length: this.length,
         
        })
    }

}