import { Breakers } from './bd/breakers';
import { Cables } from "./bd/cables";

export const defaults = {
    sectionPrefix : 'M',
    consumerPrefix : 'N',
    cableMark: Cables[0].mark,
    breakerMark: Breakers[0].mark
}