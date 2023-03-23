import { IAuthor } from "./stamp";


export class SideStamp {
    constructor() { }

    

    private _authors: Array<IAuthor> = [];
    public get authors(): Array<IAuthor> {
        return this._authors;
    }
    public set authors(v: Array<IAuthor>) {
        this._authors = v;
    }

    
}