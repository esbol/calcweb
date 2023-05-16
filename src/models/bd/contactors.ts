
export interface IContactor {
    mark: string,
    possibleCurrents: Array<number>
}

export const Contactors: Array<IContactor> = [
    {
        mark: 'ПМЛ-11',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'ПУП-3',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'AVB',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
    {
        mark: 'Комплектно',
        possibleCurrents: [10, 16, 20, 25, 32, 40, 50, 63]
    },
]