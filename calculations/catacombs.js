"use strict";
module.exports = function (userData) {
    const catacombslvl = [50, 125, 235, 395, 625, 955, 1425, 2095, 3045, 4385, 6275, 8940, 12700, 17960, 25340, 35640, 50040, 70040, 97640, 135640, 188140, 259640, 356640, 488640, 668640, 911640, 1239640, 1684640, 2284640, 3084640, 4149640, 5559640, 7459640, 9959640, 13259640, 17559640, 23159640, 30359640, 39559640, 51559640, 66559640, 85559640, 109559640, 139559640, 177559640, 225559640, 285559640, 360559640, 453559640, 569809640];
    let dungeoneering = {
        catacombslvl: 0,
        berslvl: 0,
        archerlvl: 0,
        tanklvl: 0,
        healerlvl: 0,
        magelvl: 0,
    };
    catacombslvl.forEach((temp) => {
        if ((userData['catacombs']['catacombsXP'] - temp) >= 1)
            dungeoneering.catacombslvl = catacombslvl.findIndex((xp) => xp === temp);
    });
    return dungeoneering;
};
