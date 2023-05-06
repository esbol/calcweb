
export interface IBreakerPower {
    mark: string,
    factory: string,
    colPhase: number,
    possibleCurrents: Array<number>
}

export const BreakersPower: Array<IBreakerPower> = [
    //#region EKF
    { 
        factory: 'EKF',
        colPhase: 1,
        mark : 'ВН-29',
        possibleCurrents : [16, 25, 40, 63]
    },
    { 
        factory: 'EKF',
        colPhase: 3,
        mark : 'ВН-29',
        possibleCurrents : [16, 25, 40, 63]
    },
    { 
        factory: 'EKF',
        colPhase: 1,
        mark : 'ВН-63',
        possibleCurrents : [16, 25, 40, 63]
    },
    { 
        factory: 'EKF',
        colPhase: 3,
        mark : 'ВН-63',
        possibleCurrents : [16, 25, 40, 63]
    },
    { 
        factory: 'EKF',
        colPhase: 1,
        mark : 'ВН-125',
        possibleCurrents : [100, 125]
    },
    { 
        factory: 'EKF',
        colPhase: 3,
        mark : 'ВН-125',
        possibleCurrents : [100, 125]
    },
    //#endregion

    //#region IEK
    { 
        factory: 'IEK',
        colPhase: 1,
        mark : 'ВН-32',
        possibleCurrents : [20, 25, 32, 40, 63, 100, 125]
    },
    { 
        factory: 'IEK',
        colPhase: 3,
        mark : 'ВН-32',
        possibleCurrents : [20, 25, 32, 40, 63, 100, 125]
    },
    //#endregion
]