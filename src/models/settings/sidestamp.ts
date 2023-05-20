import { HasId } from "../hasid";
import { Author } from "./stamp";


export class SideStamp extends HasId {
    constructor() { super() }

    

    private _authors: Array<Author> = [];
    public get authors(): Array<Author> {
        return this._authors;
    }
    public set authors(v: Array<Author>) {
        this._authors = v;
    }

    
}