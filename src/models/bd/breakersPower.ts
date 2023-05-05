
export interface IBreakerPower {
    mark: string,
    factory: string,
    possibleCurrents: Array<number>
}

export const BreakersPower: Array<IBreakerPower> = [
    { 
        factory: 'EKF',
        mark : 'uni9',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        factory: 'EKF',
        mark: 'ABS6',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        factory: 'EKF',
        mark: 'ВА47-29',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
]