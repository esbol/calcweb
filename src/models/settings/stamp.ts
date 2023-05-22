import { HasId } from "../hasid";
import { StampDefaults } from "./stampsettings";

export class Author extends HasId {
    constructor(position: string = '', fullName: string = '', date: string = '') {
        super()
        this.position = position
        this.fullName = fullName
        this.date = date
    }
    public position: string
    public fullName: string
    public date: string
}
export class Stamp extends HasId {
    constructor() { 
        super() 
        this.type = 'Stamp'
    }


    private _shifr: string = StampDefaults.shifr
    public get shifr(): string {
        return this._shifr;
    }
    public set shifr(v: string) {
        this._shifr = v;
        StampDefaults.shifr = v
    }



    private _projectName: string = StampDefaults.projectName
    public get projectName(): string {
        return this._projectName;
    }
    public set projectName(v: string) {
        this._projectName = v;
        StampDefaults.projectName = v
    }


    private _buildingName: string = StampDefaults.buildingName
    public get buildingName(): string {
        return this._buildingName;
    }
    public set buildingName(v: string) {
        this._buildingName = v;
        StampDefaults.buildingName = v
    }


    private _sheetName: string = StampDefaults.sheetName
    public get sheetName(): string {
        return this._sheetName;
    }
    public set sheetName(v: string) {
        this._sheetName = v;
    }


    private _stadiya: string = StampDefaults.stadiya
    public get stadiya(): string {
        return this._stadiya;
    }
    public set stadiya(v: string) {
        this._stadiya = v;
        StampDefaults.stadiya = v
    }


    private _sheetNumber: string = StampDefaults.sheetNumber
    public get sheetNumber(): string {
        return this._sheetNumber;
    }
    public set sheetNumber(v: string) {
        this._sheetNumber = v;
    }


    private _totalSheets: string = StampDefaults.totalSheets
    public get totalSheets(): string {
        return this._totalSheets;
    }
    public set totalSheets(v: string) {
        this._totalSheets = v;
        StampDefaults.totalSheets = v
    }


    private _companyName: string = StampDefaults.companyName
    public get companyName(): string {
        return this._companyName;
    }
    public set companyName(v: string) {
        this._companyName = v;
        StampDefaults.companyName = v
    }



    private _authors: Array<Author> = [new Author(StampDefaults.authors[0].position, StampDefaults.authors[0].fullName, StampDefaults.authors[0].date)] 
    public get authors(): Array<Author> {
        return this._authors;
    }
    public set authors(v: Array<Author>) {
        this._authors = v;
        StampDefaults.authors = v
    }

}