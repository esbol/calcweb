import { CommutateApparate } from "./commutateApparate";

export class Contactor extends CommutateApparate {
    setDataFromDB(mark: string): boolean {
        return true
    }

    constructor(mark: string) {
        super(mark)
    }

}