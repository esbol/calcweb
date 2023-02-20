

export function calcCurrentBySPower(spower: number, voltage: number, colPhase: number): number {

    let cur = 0
    if (spower === 0) return 0
    if (colPhase === 1) {
        cur = spower * 1000 / voltage
    } else {
        cur = spower * 1000 / (Math.sqrt(3) * voltage)
    }
    return cur
} 


export function calcCurrentByInstallPower(installPower: number, voltage: number, colPhase: number, cosf: number): number {

    let cur = 0
    if (colPhase === 1) {
        cur = installPower * 1000 / (voltage * cosf)
    } else {
        cur = installPower * 1000 / (Math.sqrt(3) * voltage * cosf)
    }
    return cur
} 

export function calcQPower(ratedPower: number, tgf: number): number {

    return ratedPower * tgf
} 

export function calcSPower(ratedPower: number, ratedQPower: number): number {

    return Math.sqrt(ratedPower * ratedPower + ratedQPower * ratedQPower)
} 