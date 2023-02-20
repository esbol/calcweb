import { Consumer } from "./consumer";

import { SectionLine } from "./sectionline";

export class Feeder {
    constructor(){

        const consumer = new Consumer()
        this._consumer = consumer

        this._sConsumer = new SectionLine()
        this._sConsumer.setEndContact(consumer.inContact)
    }

    id: number = Date.now()
    //#region consumer
    private _consumer: Consumer
    
    public set consumer(v:  Consumer) {
        this._consumer = v;
    }
    
    public get consumer(): Consumer {
        return this._consumer
    }
    //#endregion

    //#region sConsumer
    private _sConsumer: SectionLine | null = null

    public set sConsumer(v: SectionLine | null) {
        this._sConsumer = v;
    }

    public get sConsumer(): SectionLine | null {
        return this._sConsumer
    }
    //#endregion

    public calc(){
        if(this.sConsumer!== null){
            this.sConsumer.calc()
        }
     
    }
}