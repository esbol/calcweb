import { CableMaterial } from './../normativs';

export interface ICable {
    mark: string,
    possibleSquares: Array<number>,
    material: CableMaterial,

}

export const Cables: Array<ICable> = [
    { 
        mark : 'ВВГнг-(А)-ls',
        possibleSquares : [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120],
        material: CableMaterial.Медь,

    },
    {
        mark: 'ВВГнг-(А)-FRls',
        possibleSquares: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120],
        material: CableMaterial.Медь,
  
    },
    {
        mark: 'AВВГнг-(А)-ls',
        possibleSquares: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120],
        material: CableMaterial.Алюминий,
      
    },
   
]