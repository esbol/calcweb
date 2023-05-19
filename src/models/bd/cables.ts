import { SpecData } from '../SpecData';
import { CableMaterial } from './../normativs';

export interface ICable {
    mark: string,
    possibleSquares: Array<number>,
    material: CableMaterial,
    specData: SpecData
}

export const Cables: Array<ICable> = [
    { 
        mark : 'ВВГнг-(А)-ls',
        possibleSquares : [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120],
        material: CableMaterial.Медь,
        specData: new SpecData('Кабель медный с изоляцией из ПВХ, не поддерживающий горение', 'ВВГнг-(А)-ls', '', '', 'м', '', '', '')
    },
    {
        mark: 'ВВГнг-(А)-FRls',
        possibleSquares: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120],
        material: CableMaterial.Медь,
        specData: new SpecData('Кабель медный с изоляцией из ПВХ, огнеупорный горение', 'ВВГнг-(А)-FRls', '', '', 'м', '', '', '')
    },
    {
        mark: 'AВВГнг-(А)-ls',
        possibleSquares: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120],
        material: CableMaterial.Алюминий,
        specData: new SpecData('Кабель медный с изоляцией из ПВХ, не поддерживающий горение', 'ВВГнг-(А)-ls', '', '', 'м', '', '', '')
    },
   
]