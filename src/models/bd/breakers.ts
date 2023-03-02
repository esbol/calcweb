
export interface IBreaker {
    mark: string,
    possibleCurrents: Array<number>
}

export const Breakers: Array<IBreaker> = [
    { 
        mark : 'uni9',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'ABS6',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'ВА47-29',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
]