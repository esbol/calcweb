
export interface IDiffBreaker {
    mark: string,
    possibleCurrents: Array<number>
}

export const DiffBreakers: Array<IDiffBreaker> = [
    { 
        mark : 'АВДТ',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'EASY9',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'MULTI',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
]