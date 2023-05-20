
import { CurrentCharacter } from './bd/breakers';
import { DiffBreakers, IDiffBreaker } from './bd/diffbreakers';

import { CommutateApparate } from "./commutateApparate";

export class DiffBreaker extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        let diffbreaker: IDiffBreaker | undefined

        if (this.specData.factory != '') {
            diffbreaker = DiffBreakers.find(b => b.mark === mark && b.factory == this.specData.factory)
        } else diffbreaker = DiffBreakers.find(b => b.mark === mark)

        if (diffbreaker === undefined) return false
        else {
            this.specData.factory = diffbreaker.factory
            this._possibleCurrents = diffbreaker.possibleCurrents
            this.deltaI = diffbreaker.deltaI
            return true
        }
    }

    constructor(mark?: string) {
        super(mark)
        this.description = 'diffBreaker'
        this.innerSection.nameOfPlane = 'innerDiffBreaker'

        this.inContact.nameOfPlane = 'DiffBreakerInContact'
        this.outContact.nameOfPlane = 'DiffBreakerOutContact'
    }

    //#region deltaI
    protected _deltaI: number = 0
    public get deltaI(): number {
        return this._deltaI;
    }
    public set deltaI(v: number) {
        this._deltaI = v
    }
    //#endregion
    
    //#region currentCharacter
    protected _currentCharacter: CurrentCharacter = CurrentCharacter.C
    public get currentCharacter(): CurrentCharacter {
        return this._currentCharacter;
    }
    public set currentCharacter(v: CurrentCharacter) {
        this._currentCharacter = v
    }
    //#endregion

    // toJSON() {
    //     return Object.assign(super.toJSON(), {
    //         type: 'DiffBreaker',
    //         currentCharacter: this.currentCharacter,
    //         deltaI: this.deltaI
    //     })
    // }
}