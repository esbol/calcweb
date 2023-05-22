import { HasId } from "../hasid";
import { SideStamp } from "./sidestamp";
import { Stamp } from "./stamp";

export const FormatNames: Array<string> = [
    'A4',
    'A3',
    'A2',
    'A1',
    'A0'
]

export const Orientations: Array<string> = [
    'Альбомный',
    'Книжный'
]

export class Format extends HasId  {
    constructor() {
        super()
        this._stamp = new Stamp()
        this._sideStamp = new SideStamp()
        this.type = "Format"
    }

    
  




    private _width: number = 420
    public get width(): number {
        return this._width
    }
    public set width(v: number) {
        this._width = v;

    }


    private _height: number = 297
    public get height(): number {
        return this._height;
    }
    public set height(v: number) {
        this._height = v;

    }


    private _pixelScale: number = 4
    public get pixelScale(): number {
        return this._pixelScale;
    }
    public set pixelScale(v: number) {
        this._pixelScale = v;
    }


    private _stamp: Stamp
    public get stamp(): Stamp {
        return this._stamp;
    }
    public set stamp(v: Stamp) {
        this._stamp = v;
    }

    private _sideStamp: SideStamp
    public get sideStamp(): SideStamp {
        return this._sideStamp;
    }
    public set sideStamp(v: SideStamp) {
        this._sideStamp = v;
    }
    // toJSON() {
    //     return {
    //         width: this.width,
    //         stamp: {
    //             authors: this.stamp.authors,
    //             buildingName: this.stamp.buildingName,
    //             companyName: this.stamp.companyName,
    //             projectName: this.stamp.projectName,
    //             sheetName: this.stamp.sheetName,
    //             sheetNumber: this.stamp.sheetNumber,
    //             shifr: this.stamp.shifr,
    //             stadiya: this.stamp.stadiya,
    //             totalSheets: this.stamp.totalSheets,
    //         },
    //         id: this.id,
    //     }
    // }
}