


export enum Phase {
    A,
    B,
    C,
    ABC
}

export abstract class ELObject {
    id: number = Math.random()
    nameOfPlane: string = ''

    voltage: number = 220
  

   
    description: string = ''

    constructor() { }

    abstract setDataFromDB(mark: string): boolean
}



