import { HasId } from "./hasid"

export class SpecData extends HasId {
    
    constructor(description:string = '', mark:string = '', code:string = '', factory:string = '', units:string = '', count:string = '', mass:string = '', note:string = ''){
        super()
        this.description = description
        this.mark = mark
        this.code = code
        this.factory = factory
        this.units = units
        this.count = count
        this.mass = mass
        this.note = note
        this.type = 'SpecData'
    }
    public position: string = ''
    public description: string = ''
    public mark: string = ''
    public code: string = ''
    public factory: string = ''
    public units: string = ''
    public count: string = ''
    public mass: string = ''
    public note: string = ''
   
}