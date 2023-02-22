import { CommutateApparate } from "./commutateApparate";

export class Breaker extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        return true
    }
    
    constructor(){
        super()
        this.description = 'breaker'
    }
    
}