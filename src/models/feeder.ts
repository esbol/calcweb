import { Cables } from './bd/cables';
import { Breakers } from './bd/breakers';
import { Contact } from './contact';
import { Contactor } from './contactor';
import { Breaker } from "./breaker";
import { Consumer } from "./consumer";

import { SectionLine } from "./sectionline";
import { Panel } from './panel';

export class Feeder {
    
    constructor(panel: Panel, connectContact: Contact){

        this._breaker = new Breaker(Breakers[0].mark)
        this._breaker.nameOfPlane ='QF' + (panel.feeders.length + 1).toString()
        this._sBreaker = new SectionLine()
        this._sBreaker.description = 'sBreaker'
        this._sBreaker.setStartContact(connectContact)
        this._sBreaker.setEndContact(this._breaker.inContact)

        const consumer = new Consumer()
        this._consumer = consumer
        this._consumer.nameOfPlane = 'N' + (panel.feeders.length + 1).toString()
        this._consumer.description = 'Наименование'
        
        this._sConsumer.setEndContact(consumer.inContact)
        this._sConsumer.description = 'sConsumer'
        this._sConsumer.nameOfPlane = 's' + (panel.feeders.length + 1).toString()
        this._sConsumer.cable.mark = Cables[0].mark
        this._sConsumer.setStartContact(this._breaker.outContact)
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

    //#region breaker
    private _breaker: Breaker | null = null

    public set breaker(v: Breaker | null) {
        this._breaker = v;
    }

    public get breaker(): Breaker | null {
        return this._breaker
    }
    //#endregion

    //#region contactor
    private _contactor: Contactor | null = null

    public set contactor(v: Contactor | null) {
        this._contactor = v;
    }

    public get contactor(): Contactor | null {
        return this._contactor
    }
    //#endregion


    //#region sConsumer
    private _sConsumer: SectionLine = new SectionLine()

    public set sConsumer(v: SectionLine ) {
        this._sConsumer = v;
    }

    public get sConsumer(): SectionLine {
        return this._sConsumer
    }
    //#endregion

    //#region sBreaker
    private _sBreaker: SectionLine | null = null

    public set sBreaker(v: SectionLine | null) {
        this._sBreaker = v;
    }

    public get sBreaker(): SectionLine | null {
        return this._sBreaker
    }
    //#endregion
  
    //#region sContactor
    private _sContactor: SectionLine | null = null

    public set sContactor(v: SectionLine | null) {
        this._sContactor = v;
    }

    public get sContactor(): SectionLine | null {
        return this._sContactor
    }
    //#endregion


    public calc(){

        if(this.consumer !== null) this.consumer.calc()

        if (this.sConsumer !== null) this.sConsumer.calc()
       
        

        if (this.contactor !== null) this.contactor.calc()
        if (this.sContactor !== null) this.sContactor.calc()
        if (this.breaker !== null) this.breaker.calc()

        if(this.sBreaker !== null) this.sBreaker.calc()

        let brCur = this.sConsumer.modeMax.current
        if (this._breaker !== null)
        {
            brCur = this._breaker.nominalCurrent
        } 
        this.sConsumer.cable.calc(this.sConsumer, brCur)

        
        
    }
}