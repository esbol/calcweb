import { Breaker } from './breaker';
import { Cables, ICable } from './bd/cables';
import { SectionLine } from './sectionline';
import { CableMaterial, ICableCurrentPUE, PUECurrents, CableEnviroment } from './normativs';
import { ELObject } from "./elobject";
import { CommutateApparate } from './commutateApparate';
import { Contact } from './contact';

export class Cable extends ELObject {
    setDataFromDB(mark: string): boolean {
       const cab: ICable | undefined = Cables.find(c=> c.mark) 
        if(cab != undefined){
            this.possibleSquares = cab.possibleSquares
            this.material = cab.material
            return true
        }else return false
    }

    constructor(section: SectionLine) {
        super()
        this._sectionLine = section
    }

    //#region sectionLine
    private _sectionLine : SectionLine
    public get sectionLine(): SectionLine  {
        return this._sectionLine;
    }
    public set sectionLine(v: SectionLine ) {
        this._sectionLine = v;
    }
    //#endregion

    //#region square
    private _square: number = 1.5;
    public get square(): number {
        return this._square;
    }
    public set square(v: number) {
        this._square = v;
    }
    //#endregion

    //#region colCores
    private _colCores: number = 3;
    public get colCores(): number {
        return this._colCores;
    }
    public set colCores(v: number) {
        this._colCores = v;
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

    public calc() {

        if(this.sectionLine.isInPanel) return
        this.setColCores()
       
   



       
        //сечение по номиналу автомата
        let currentApparate = 0
        const br = this.getSaftyApparate()
        if(br != null){
           
            currentApparate = br.nominalCurrent
          
        }else{
             currentApparate = this.sectionLine.modeMax.current
        }
        
        
        
    
        
        let cableData: ICableCurrentPUE | null = this.getPUESquare(currentApparate, this.sectionLine.enviroment)

       
        
        if(cableData != null){
            this._maxCurrent = cableData.current
            this._square = cableData.square
        }
        
    

    }


    private getPUESquare(current: number, env: CableEnviroment): ICableCurrentPUE | null {
        let cableData: ICableCurrentPUE |null = null

        
        if(this.sectionLine.colPhase == 1){
            for (let index = 0; index < PUECurrents.length; index++) {
                const el = PUECurrents[index];
                if (el.current > current
                    && el.colCores === 2
                    && el.enviroment === env
                    && el.material === this._material) {
                    cableData = el

                    break
                }
            }
            return cableData
        }else{
            for (let index = 0; index < PUECurrents.length; index++) {
                const el = PUECurrents[index];
                if (el.current > current
                    && el.colCores === 3
                    && el.enviroment === env
                    && el.material === this._material) {
                    cableData = el

                    break
                }
            }
            return cableData
        }
       
    }

    private setColCores() {
        this.sectionLine.colPhase === 1 ? this._colCores = 3 : this._colCores = 5
    }

    private getSaftyApparate(): CommutateApparate | null{
        let br = null
        if(this.sectionLine.endContact != null) recurcy(this.sectionLine.endContact)
        function recurcy(contact: Contact){
            contact.getSupplySections().forEach(s=>{
                if(s.startContact != null){
                    if(s.startContact.ownDevice instanceof CommutateApparate){
                        br = s.startContact.ownDevice as CommutateApparate
                    }else{
                        recurcy(s.startContact)
                    }
                }
            })
        }

        return br
    }

}