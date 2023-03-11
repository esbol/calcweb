export const TypesBySP: Array<string> =
[
    'Квартиры', 'Лифты', 'Сантехническое', 'Противопожарное', 'Освещение', 'Технологическое', 'Розетки'
]
    
export const CalculationModesNames: Array<string> =
    [
        'нормальный'
    ]

export enum CableMaterial {
    Медь = 1,
    Алюминий = 2
}
export const ColPhases: Array<number> = [1, 3]

export enum CableEnviroment {
    Air = 1,
    Ground = 2
}
export interface ICableCurrentPUE {
    material: CableMaterial,
    colCores: number,
    enviroment: CableEnviroment,
    square: number,
    current: number
}
export const PUECurrents: Array<ICableCurrentPUE> = [
    //#region 1 cores Air Cu
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 1.5,
        current: 23
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 2.5,
        current: 30
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 4,
        current: 41
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 6,
        current: 50
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 10,
        current: 80
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 16,
        current: 100
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 25,
        current: 140
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 35,
        current: 170
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 50,
        current: 215
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 70,
        current: 270
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 95,
        current: 325
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 120,
        current: 385
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 150,
        current: 440
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 185,
        current: 510
    },
    {
        material: CableMaterial.Медь,
        colCores: 1,
        enviroment: CableEnviroment.Air,
        square: 240,
        current: 605
    },
    //#endregion

    //#region 2 cores Air Cu
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 1.5,
        current: 19
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 2.5,
        current: 27
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 4,
        current: 38
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 6,
        current: 50
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 10,
        current: 70
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 16,
        current: 90
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 25,
        current: 115
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 35,
        current: 140
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 50,
        current: 175
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 70,
        current: 215
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 95,
        current: 260
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 120,
        current: 300
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 150,
        current: 350
    },
    {
        material: CableMaterial.Медь,
        colCores: 2,
        enviroment: CableEnviroment.Air,
        square: 185,
        current: 405
    },
    //#endregion

    //#region 3 cores Air Cu
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 1.5,
        current: 19
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 2.5,
        current: 25
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 4,
        current: 35
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 6,
        current: 42
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 10,
        current: 55
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 16,
        current: 75
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 25,
        current: 95
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 35,
        current: 120
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 50,
        current: 145
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 70,
        current: 180
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 95,
        current: 220
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 120,
        current: 260
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 150,
        current: 305
    },
    {
        material: CableMaterial.Медь,
        colCores: 3,
        enviroment: CableEnviroment.Air,
        square: 185,
        current: 350
    },
    //#endregion

]
