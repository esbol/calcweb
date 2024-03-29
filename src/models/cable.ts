import { Breaker } from './breaker';
import { Cables, ICable } from './bd/cables';
import { SectionLine } from './sectionline';
import { CableMaterial, ICableCurrentPUE, PUECurrents, CableEnviroment } from './normativs';
import { ELObject } from "./elobject";
import { CommutateApparate } from './commutateApparate';
import { Contact } from './contact';
import { SpecData } from './SpecData';

export class Cable extends ELObject {
    setDataFromDB(mark: string): boolean {
        const cab: ICable | undefined = Cables.find(c => c.mark == mark)
        if (cab != undefined) {
            this.possibleSquares = cab.possibleSquares
            this.material = cab.material
            this.specData = cab.specData
            return true
        } else return false
    }

    constructor(section?: SectionLine) {
        super()
        this.type = 'Cable'
        if (section != undefined) this._sectionLine = section
    }

    //#region sectionLine
    private _sectionLine: SectionLine | null = null
    public get sectionLine(): SectionLine | null {
        return this._sectionLine;
    }
    public set sectionLine(v: SectionLine | null) {
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
        if (this.setDataFromDB(v))
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

    //#region deltaU
    private _deltaU: number = 0;
    public get deltaU(): number {
        return this._deltaU;
    }
    public set deltaU(v: number) {
        this._deltaU = v;
    }
    //#endregion


    public calc() {
        if (this.sectionLine == null) return
        if (this.sectionLine.isInPanel) return
        this.setColCores()






        //сечение по номиналу автомата
        let currentApparate = 0
        const br = this.getSaftyApparate()
        if (br != null) {

            currentApparate = br.nominalCurrent

        } else {
            currentApparate = this.sectionLine.modeMax.current
        }





        let cableData: ICableCurrentPUE | null = this.getPUESquare(currentApparate, this.sectionLine.enviroment)



        if (cableData != null) {


            if (this._square < cableData.square) {
                this._square = cableData.square
                this._maxCurrent = cableData.current
            } else {
                const mCur = this.getPUEMaxCurrent(this._square)?.current
                if (mCur != undefined) this._maxCurrent = mCur
            }

        }

        this.deltaU = this.calcDeltaU()


    }

    private getPUEMaxCurrent(square: number): ICableCurrentPUE | null {
        if (this.sectionLine == null) return null
        let cableData: ICableCurrentPUE | null = null


        if (this.sectionLine.colPhase == 1) {
            for (let index = 0; index < PUECurrents.length; index++) {
                const el = PUECurrents[index];
                if (el.square == square
                    && el.colCores === 2
                    && el.enviroment === this.sectionLine.enviroment
                    && el.material === this._material) {
                    cableData = el

                    break
                }
            }
            return cableData
        } else {
            for (let index = 0; index < PUECurrents.length; index++) {
                const el = PUECurrents[index];
                if (el.square == square
                    && el.colCores === 3
                    && el.enviroment === this.sectionLine.enviroment
                    && el.material === this._material) {
                    cableData = el

                    break
                }
            }
            return cableData
        }
    }

    private getPUESquare(current: number, env: CableEnviroment): ICableCurrentPUE | null {
        if (this.sectionLine == null) return null
        let cableData: ICableCurrentPUE | null = null


        if (this.sectionLine.colPhase == 1) {
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
        } else {
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
        if (this.sectionLine == null) return 1
        this.sectionLine.colPhase === 1 ? this._colCores = 3 : this._colCores = 5
    }

    private getSaftyApparate(): CommutateApparate | null {
        if (this.sectionLine == null) return null
        let br = null
        if (this.sectionLine.endContact != null) recurcy(this.sectionLine.endContact)
        function recurcy(contact: Contact) {
            contact.getSupplySections().forEach(s => {
                if (s.startContact != null) {
                    if (s.startContact.ownDevice instanceof CommutateApparate) {
                        br = s.startContact.ownDevice as CommutateApparate
                    } else {
                        recurcy(s.startContact)
                    }
                }
            })
        }

        return br
    }

    private calcDeltaU(): number {
        if (this.sectionLine == null) return 0
        const CuActiveResistance = 0.0181
        let dU = 0;
        const section = this.sectionLine
        if (section.cable.material == CableMaterial.Медь) {
            if (section.colPhase == 3) {
                dU = Math.sqrt(3) * section.modeMax.current * section.cable.length * (CuActiveResistance / section.cable.square * section.modeMax.cosf);
                dU = dU / 3.8;
            }
            else {


                dU = 2 * section.modeMax.current * section.cable.length * (CuActiveResistance / section.cable.square * section.modeMax.cosf);
                dU = dU / 2.2;
            }
        }

        return dU;
    }
    //#region specData
    private _specData: SpecData = new SpecData('', '', '', '', '', '', '', '');
    public get specData(): SpecData {
        return this._specData;
    }
    public set specData(v: SpecData) {
        this._specData = v;
    }
    //#endregion
    // toJSON() {
    //     return Object.assign(super.toJSON(), {

    //         mark: this.mark,
    //         colCores: this.colCores,
    //         square: this.square,
    //         length: this.length,
    //         material: this.material,
    //         maxCurrent: this.maxCurrent,
    //         deltaU: this.deltaU
    //     })
    // }
}