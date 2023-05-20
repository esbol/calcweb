import { Breakers, CurrentCharacter, IBreaker } from './bd/breakers';

import { CommutateApparate } from "./commutateApparate";

export class Breaker extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        let breaker: IBreaker | undefined
        if( this.specData.factory != ''){
            breaker = Breakers.find(b=> b.mark === mark && b.factory == this.specData.factory)
        }else  breaker = Breakers.find(b=> b.mark === mark)
         
        if(breaker === undefined) return false
        else{
            this._possibleCurrents = breaker.possibleCurrents
            this.specData.factory = breaker.factory
            return true
        }
    }

    //#region currentCharacter
    protected _currentCharacter: CurrentCharacter = CurrentCharacter.C
    public get currentCharacter(): CurrentCharacter {
        return this._currentCharacter;
    }
    public set currentCharacter(v: CurrentCharacter) {
        this._currentCharacter = v
    }
    //#endregion

    constructor(mark?: string){
        super(mark)
        this.description = 'breaker'
        this.innerSection.nameOfPlane = 'innerBreaker'
        
        this.inContact.nameOfPlane = 'BreakerInContact'
        this.outContact.nameOfPlane = 'BreakerOutContact'
    }
    
    // toJSON(){
    //     return Object.assign(super.toJSON(), {
    //         type: 'Breaker',
    //         currentCharacter: this.currentCharacter
    //     })
    // }
}