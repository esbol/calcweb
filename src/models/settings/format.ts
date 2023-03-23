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

export class Format {
    constructor() {
        this._stamp = new Stamp()
        this._sideStamp = new SideStamp()
     }


    private _name: string = FormatNames[1]
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
        console.log(v);
        
        if (v === FormatNames[0]){
            if(this.orientation == Orientations[0]){
                this.width = 297
                this.height = 210
            }else{
                this.width = 210
                this.height = 297
            }
        } else if (v === FormatNames[1]) {
            if (this.orientation == Orientations[0]) {
                this.width = 420
                this.height = 297
            } else {
                this.width = 297
                this.height = 420
            }
        } else if (v === FormatNames[2]) {
            if (this.orientation == Orientations[0]) {
                this.width = 594
                this.height = 420
            } else {
                this.width = 420
                this.height = 594
            }
        } else if (v === FormatNames[3]) {
            if (this.orientation == Orientations[0]) {
                this.width = 841
                this.height = 594
            } else {
                this.width = 594
                this.height = 841
            }
        } else if (v === FormatNames[4]) {
         
            
            if (this.orientation == Orientations[0]) {
                this.width = 1188
                this.height = 841
            } else {
                this.width = 841
                this.height = 1188
            }
        }
    }



    private _orientation: string = Orientations[0]
    public get orientation(): string {
        return this._orientation;
    }
    public set orientation(v: string) {
        this._orientation = v;
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

    
    private _stamp : Stamp 
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

}