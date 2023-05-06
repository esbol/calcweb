import { CurrentCharacter } from "./breakers"

export interface IDiffBreaker {
    factory: string,
    colPhase: number,
    character: CurrentCharacter,
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
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'IEK',
        colPhase: 1,
        deltaI: 30,
        mark : 'АД12',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'IEK',
        colPhase: 1,
        deltaI: 30,
        mark : 'АВДТ32',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'IEK',
        colPhase: 3,
        deltaI: 30,
        mark : 'АВДТ34',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    //#endregion


    //#region EKF
    { 
        factory: 'EKF',
        colPhase: 1,
        deltaI: 30,
        mark : 'АД-12',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'EKF',
        colPhase: 3,
        deltaI: 30,
        mark : 'АД-12',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    { 
        factory: 'EKF',
        colPhase: 1,
        deltaI: 30,
        mark : 'АВДТ-63М',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32]
    },
    { 
        factory: 'EKF',
        colPhase: 3,
        deltaI: 30,
        mark : 'АВДТ-63М',
        character: CurrentCharacter.C,
        possibleCurrents : [10, 16, 20, 25, 32]
    },
    //#endregion 

]