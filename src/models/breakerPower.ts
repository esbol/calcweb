import { BreakersPower, IBreakerPower } from './bd/breakersPower';

import { CommutateApparate } from "./commutateApparate";

export class BreakerPower extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        const breaker: IBreakerPower | undefined = BreakersPower.find(b=> b.mark === mark)
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
        
        this.inContact.nameOfPlane = 'BreakerInContact'
        this.outContact.nameOfPlane = 'BreakerOutContact'
    }
    
    toJSON(){
        return Object.assign(super.toJSON(), {
            type: 'BreakerPower'
        })
    }
}