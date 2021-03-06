let userData = {}
function zomb() {
    if (userData['slayers']['revenant']['slayerXP'] > 1000000) {
        const zombie1 = ((userData['slayers']['revenant']['slayerXP'] - 1000000) / 10000) + (userData['slayers']['revenant']['slayerXP'] / 6000) * 1.36;
        return zombie1;
    }
    else {
        const zombie1 = (userData['slayers']['revenant']['slayerXP'] / 6000) * 1.21;
        return zombie1;
    }
}
function tar() {
    if (userData['slayers']['tarantula']['slayerXP'] > 1000000) {
        const tara1 = ((userData['slayers']['tarantula']['slayerXP'] - 1000000) / 1650) + (userData['slayers']['tarantula']['slayerXP'] / 1150) * 1.23;
        return tara1;
    }
    else {
        const tara1 = (userData['slayers']['tarantula']['slayerXP'] / 1150) * 1.17;
        return tara1;
    }
}
function wolf() {
    if (userData['slayers']['sven']['slayerXP'] > 1000000) {
        const sven1 = ((userData['slayers']['sven']['slayerXP'] - 1000000) / 1500) + (userData['slayers']['sven']['slayerXP'] / 1200) * 1.26;
        return sven1;
    }
    else {
        const sven1 = (userData['slayers']['sven']['slayerXP'] / 1200) * 1.16;
        return sven1;
    }
}
function enderman() {
    if (userData['slayers']['voidgloom']['slayerXP'] > 1000000) {
        const eman1 = ((userData['slayers']['voidgloom']['slayerXP'] - 1000000) / 1500) + (userData['slayers']['voidgloom']['slayerXP'] / 1000) * 1.42;
        return eman1;
    }
    else {
        const eman1 = (userData['slayers']['voidgloom']['slayerXP'] / 1000) * 1.27;
        return eman1;
    }
}
function combatxp() {
    let res = 0;
    let firstbar = 1000;
    while (userData.skills.combat.xp > firstbar) {
        firstbar = firstbar + (firstbar/50)
        res++
    }
    return res
}
function miningxp() {
    let res = 0;
    let firstbar = 1000;
    while (userData.skills.mining.xp > firstbar)
    {
        firstbar = firstbar + (firstbar/40)
        res++
    }
    return res
}
function enchantingxp() {
    let res = 0;
    let firstbar = 1000;
    while (userData.skills.enchanting.xp > firstbar)
    {
        firstbar = firstbar + (firstbar/100)
        res++
    }
    return res
}
const SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];
function abbreviateNumber(number) {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  
    // if zero, we don't need a suffix
    if (tier == 0) return number;
  
    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
  
    // scale the number
    var scaled = number / scale;
  
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
module.exports = (Data) => {
    userData = Data
    return {
        combatWeight: combatxp().toPrecision(3),
        VoidgloomWeight: enderman().toPrecision(3),
        TarantulaWeight: tar().toPrecision(3),
        SvenWeight: wolf().toPrecision(3),
        RevenantWeight: zomb().toPrecision(3),
        totalWeight: combatxp() + enderman() + tar() + wolf() + zomb() + enchantingxp() + miningxp(),
        weightAbbrev: (combatxp() + enderman() + tar() + wolf() + zomb() + enchantingxp() + miningxp() >= 1000) ? abbreviateNumber(combatxp() + enderman() + tar() + wolf() + zomb() + enchantingxp() + miningxp()) : Math.round(combatxp() + enderman() + tar() + wolf() + zomb() + enchantingxp() + miningxp())
    }
}