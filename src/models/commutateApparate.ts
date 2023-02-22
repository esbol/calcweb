import { SectionLine } from './sectionline';
import { Contact } from "./contact";
import { Device } from "./device";

export abstract class CommutateApparate extends Device {
    constructor() {
        super()
        this.innerSection.nameOfPlane = 'innerSection'
        this.innerSection.setStartContact(this.inContact)
        this.innerSection.setEndContact(this.outContact)
    }

    readonly outContact: Contact = new Contact(this)
    readonly innerSection:SectionLine = new SectionLine()

    public calc(current: number = 0){
        if(current=== undefined) current = 0
        this.innerSection.calc()
    }
}