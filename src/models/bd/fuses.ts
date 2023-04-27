
export interface IFuse {
    mark: string,
    possibleCurrents: Array<number>
}

export const Fuses: Array<IFuse> = [
    { 
        mark : 'ППН',
        possibleCurrents : [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'ПН2-100',
        possibleCurrents: [30, 40, 50, 60, 80, 100]
    },
    {
        mark: 'ПН2-250',
        possibleCurrents: [80, 100, 120, 150, 200, 250]
    },
    {
        mark: 'ПН2-400',
        possibleCurrents: [200, 250, 300, 350, 400]
    },
    {
        mark: 'ПН2-600',
        possibleCurrents: [300, 400, 500, 600]
    },
]