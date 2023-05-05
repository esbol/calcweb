
export interface IDiffBreaker {
    factory: string,
    colPhase: number,
    deltaI: number,
    mark: string,
    possibleCurrents: Array<number>
}

export const DiffBreakers: Array<IDiffBreaker> = [
    //#region IEK
    { 
        factory: 'IEK',
        colPhase: 3,
        deltaI: 30,
        mark : 'АД12',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'IEK',
        colPhase: 1,
        deltaI: 30,
        mark : 'АД12',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'IEK',
        colPhase: 1,
        deltaI: 30,
        mark : 'АВДТ32',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'IEK',
        colPhase: 3,
        deltaI: 30,
        mark : 'АВДТ34',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    //#endregion

]