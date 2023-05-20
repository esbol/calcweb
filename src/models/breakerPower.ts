import { CurrentCharacter } from './bd/breakers';
import { BreakersPower, IBreakerPower } from './bd/breakersPower';

import { CommutateApparate } from "./commutateApparate";

export class BreakerPower extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        let breakerPower: IBreakerPower | undefined

        if (this.specData.factory != '') {
            breakerPower = BreakersPower.find(b => b.mark === mark && b.factory == this.specData.factory)
        } else breakerPower = BreakersPower.find(b => b.mark === mark)

        if (breakerPower === undefined) return false
        else {
            this.specData.factory = breakerPower.factory
            this._possibleCurrents = breakerPower.possibleCurrents
            return true
        }
    }
  
    constructor(mark?: string) {
        super(mark)
        this.description = 'breaker'
        this.innerSection.nameOfPlane = 'innerBreaker'

        this.inContact.nameOfPlane = 'BreakerInContact'
        this.outContact.nameOfPlane = 'BreakerOutContact'
    }

    // toJSON() {
    //     return Object.assign(super.toJSON(), {
    //         type: 'BreakerPower'
    //     })
    // }
}