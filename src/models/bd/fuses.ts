
export interface IFuse {
    factory: string,
    mark: string,
    possibleCurrents: Array<number>
}

export const Fuses: Array<IFuse> = [
    //#region IEK
    { 
        factory: 'IEK',
        mark : 'ППНИ-33',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160]
    },
    { 
        factory: 'IEK',
        mark : 'ППНИ-35',
        possibleCurrents : [40, 50, 63, 80, 100, 125, 160, 200, 250]
    },
    { 
        factory: 'IEK',
        mark : 'ППНИ-37',
        possibleCurrents : [40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400]
    },
    { 
        factory: 'IEK',
        mark : 'ППНИ-39',
        possibleCurrents : [ 100, 125, 160, 200, 250, 315, 400, 500, 630]
    },
    
    //#endregion
    
    //#region EKF
    {
        factory: 'EKF',
        mark: 'ПН2-250',
        possibleCurrents: [80, 100, 120, 150, 200, 250]
    },
    {
        factory: 'EKF',
        mark: 'ПН2-400',
        possibleCurrents: [200, 250, 300, 350, 400]
    },
    {
        factory: 'EKF',
        mark: 'ПН2-600',
        possibleCurrents: [300, 400, 500, 600]
    },
    {
        factory: 'EKF',
        mark: 'ПН2-100',
        possibleCurrents: [30, 40, 50, 60, 80, 100]
    },
    //#endregion
]