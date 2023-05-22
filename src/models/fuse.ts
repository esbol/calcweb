import { Fuses, IFuse } from './bd/fuses';

import { CommutateApparate } from "./commutateApparate";

export class Fuse extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        let fuse: IFuse | undefined
        if( this.specData.factory != ''){
            fuse = Fuses.find(b=> b.mark === mark && b.factory == this.specData.factory)
        }else  fuse = Fuses.find(b=> b.mark === mark)
         
        if(fuse === undefined) return false
        else{
            this._possibleCurrents = fuse.possibleCurrents
            this.specData.factory = fuse.factory
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
        this.type = 'Fuse'
    }
    
    // toJSON(){
    //     return Object.assign(super.toJSON(), {
    //         type: 'Fuse'
    //     })
    // }
}