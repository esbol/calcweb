import { Fuses, IFuse } from './bd/fuses';

import { CommutateApparate } from "./commutateApparate";

export class Fuse extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        const fuse: IFuse | undefined = Fuses.find(f=> f.mark === mark)
        if(fuse === undefined) return false
        else{
            this._possibleCurrents = fuse.possibleCurrents
            return true
        }
    }

    constructor(mark?: string){
        super(mark)
        this.description = 'Fuse'
        this.innerSection.nameOfPlane = 'innerFuse'
        this.innerSection.description = 'innerFuse'
        this.inContact.nameOfPlane = 'FuseInContact'
        this.outContact.nameOfPlane = 'FuseOutContact'
    }
    
    toJSON(){
        return Object.assign(super.toJSON(), {
            type: 'Fuse'
        })
    }
}