import { Breakers, IBreaker } from './bd/breakers';

import { CommutateApparate } from "./commutateApparate";

export class Breaker extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        const breaker: IBreaker | undefined = Breakers.find(b=> b.mark === mark)
        if(breaker === undefined) return false
        else{
            this._possibleCurrents = breaker.possibleCurrents
            return true
        }
    }

    constructor(mark?: string){
        super(mark)
        this.description = 'breaker'
        this.innerSection.nameOfPlane = 'innerBreaker'
        this.innerSection.description = 'innerBreaker'
        this.inContact.nameOfPlane = 'BreakerInContact'
        this.outContact.nameOfPlane = 'BreakerOutContact'
    }
    
    toJSON(){
        return Object.assign(super.toJSON(), {
            type: 'Breaker'
        })
    }
}