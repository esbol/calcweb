export enum CurrentCharacter {
    A,
    B,
    C,
    D 
}

export interface IBreaker {
    factory: string,
    mark: string,
    colPhase: number,
    character: CurrentCharacter,
    possibleCurrents: Array<number>
}

export const Breakers: Array<IBreaker> = [
    //#region IEK
    {
        factory: 'IEK',
        colPhase: 1,
        mark: 'ВА47-29',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63]
    },
    {
        factory: 'IEK',
        colPhase: 3,
        mark: 'ВА47-29',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63]
    },
    {
        factory: 'IEK',
        colPhase: 1,
        mark: 'ВА47-100',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16, 25, 32, 40, 50, 63, 80, 100]
    },
    {
        factory: 'IEK',
        colPhase: 3,
        mark: 'ВА47-100',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16, 25, 32, 40, 50, 63, 80, 100]
    },
    //#endregion

    //#region EKF
    {
        factory: 'EKF',
        colPhase: 1,
        mark: 'ВА47-63',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63]
    },
    {
        factory: 'EKF',
        colPhase: 3,
        mark: 'ВА47-63',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63]
    },
    {
        factory: 'EKF',
        colPhase: 1,
        mark: 'ВА47-100',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63, 80, 100]
    },
    {
        factory: 'EKF',
        colPhase: 3,
        mark: 'ВА47-100',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63, 80, 100]
    },
    {
        factory: 'EKF',
        colPhase: 1,
        mark: 'ВА47-125',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16,  25, 32, 40, 50, 63, 80, 100, 125]
    },
    {
        factory: 'EKF',
        colPhase: 3,
        mark: 'ВА47-125',
        character: CurrentCharacter.C,
        possibleCurrents: [ 16, 25, 32, 40, 50, 63, 80, 100, 125]
    },
    //#endregion
]