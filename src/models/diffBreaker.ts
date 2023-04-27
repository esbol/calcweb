
import { DiffBreakers, IDiffBreaker } from './bd/diffbreakers';

import { CommutateApparate } from "./commutateApparate";

export class DiffBreaker extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        const diffbreaker: IDiffBreaker | undefined = DiffBreakers.find(b=> b.mark === mark)
        if(diffbreaker === undefined) return false
        else{
            this._possibleCurrents = diffbreaker.possibleCurrents
            return true
        }
    }

    constructor(mark?: string){
        super(mark)
        this.description = 'diffBreaker'
        this.innerSection.nameOfPlane = 'innerDiffBreaker'
        
        this.inContact.nameOfPlane = 'DiffBreakerInContact'
        this.outContact.nameOfPlane = 'DiffBreakerOutContact'
    }
    
    toJSON(){
        return Object.assign(super.toJSON(), {
            type: 'DiffBreaker'
        })
    }
}