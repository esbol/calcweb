import { Device } from "./device";
import { Feeder } from "./feeder";

export class Panel extends Device {
    setDataFromDB(mark: string): boolean {
       return true
    }
    constructor(){
        super()
    }

    //#region feeders
    private _feeders: Array<Feeder> = new Array<Feeder>();
    public get feeders(): Array<Feeder>  {
        return this._feeders;
    }
    public set feeders(v: Array<Feeder>) {
        this._feeders = v;
    }
    //#endregion

    public calc(){
        this.feeders.forEach(f=>{
            f.calc()
        })
    }

}