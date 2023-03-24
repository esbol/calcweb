import { SpecData } from '../SpecData';
import { PipeMaterial } from './../normativs';

export interface IPipe {
    mark: string,
    possibleDiametrs: Array<number>,
    material: PipeMaterial,
    specData: SpecData

}

export const Pipes: Array<IPipe> = [
    {
        mark: 'Пг',
        possibleDiametrs: [16, 20, 25, 32, 40 , 50, 63],
        material: PipeMaterial.ПВХ,
        specData: new SpecData("Труба гофрированная из ПВХ. ГОСТ 18599-2001", "ПВХ гофр.", '', 'DKS', 'м', '', '', '')
    },
    {
        mark: 'ПНД',
        possibleDiametrs: [16, 20, 25, 32, 40, 50, 63],
        material: PipeMaterial.ПНД,
        specData: new SpecData("Труба полиэтиленовая. ГОСТ 18599-2001", "ПЭ.", '', 'DKS', 'м', '', '', '')
    },
    {
        mark: 'Т',
        possibleDiametrs: [16, 20, 25, 32, 40, 50, 63],
        material: PipeMaterial.Сталь,
        specData: new SpecData("Труба стальная. ГОСТ 18599-2001", "ПВХ гофр.", '', 'DKS', 'м', '', '', '')
    },

]