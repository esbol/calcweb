
export interface IAuthor{
    position: string,
    fullName: string,
    date: string
}
export class Stamp {
    constructor(){}

    
    private _shifr : string = "Шифр"
    public get shifr() : string {
        return this._shifr;
    }
    public set shifr(v : string) {
        this._shifr = v;
    }
    

    
    private _projectName : string = "Наименование комплекса"
    public get projectName() : string {
        return this._projectName;
    }
    public set projectName(v : string) {
        this._projectName = v;
    }
    
    
    private _buildingName : string= 'Наименование объекта'
    public get buildingName() : string {
        return this._buildingName;
    }
    public set buildingName(v : string) {
        this._buildingName = v;
    }
    
    
    private _sheetName : string = '';
    public get sheetName() : string {
        return this._sheetName;
    }
    public set sheetName(v : string) {
        this._sheetName = v;
    }
    
    
    private _stadiya : string = 'РП';
    public get stadiya() : string {
        return this._stadiya;
    }
    public set stadiya(v : string) {
        this._stadiya = v;
    }
    
    
    private _sheetNumber : string= '1';
    public get sheetNumber() : string {
        return this._sheetNumber;
    }
    public set sheetNumber(v : string) {
        this._sheetNumber = v;
    }
    
    
    private _totalSheets : string= '';
    public get totalSheets() : string {
        return this._totalSheets;
    }
    public set totalSheets(v : string) {
        this._totalSheets = v;
    }
    
    
    private _companyName : string = '';
    public get companyName() : string {
        return this._companyName;
    }
    public set companyName(v : string) {
        this._companyName = v;
    }
    

    
    private _authors : Array<IAuthor> = [];
    public get authors(): Array<IAuthor> {
        return this._authors;
    }
    public set authors(v: Array<IAuthor>) {
        this._authors = v;
    }
    
}