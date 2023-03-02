import { CableMaterial } from './../normativs';

export interface ICable {
    mark: string,
    possibleSquares: Array<number>,
    material: CableMaterial,

}

export const Cables: Array<ICable> = [
    { 
        mark : 'ВВГнг-(А)-ls',
        possibleSquares : [10, 16, 20, 25, 32, 40, 50, 63],
        material: CableMaterial.Медь,

    },
    {
        mark: 'ВВГнг-(А)-FRls',
        possibleSquares: [10, 16, 20, 25, 32, 40, 50, 63],
        material: CableMaterial.Медь,
  
    },
    {
        mark: 'AВВГнг-(А)-ls',
        possibleSquares: [10, 16, 20, 25, 32, 40, 50, 63],
        material: CableMaterial.Алюминий,
      
    },
   
]