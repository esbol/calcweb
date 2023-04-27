import { Contactors, IContactor } from './bd/contactors';
import { CommutateApparate } from "./commutateApparate";

export class Contactor extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        let cont: IContactor | undefined
       
        cont = Contactors.find(c=>c.mark === mark)
        if(cont != undefined){
   
            this.possibleCurrents = cont.possibleCurrents
            return true
        }
        return false
    }

    constructor(mark?: string) {
        super(mark)
        this.innerSection.nameOfPlane = 'innerContactor'
        
    }

    toJSON(){
        return Object.assign(super.toJSON(), {
            type: 'Contactor'
        })
    }
}