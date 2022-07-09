module.exports = async (SkySimData) => {
    //Skills Section
    const SkillXPArray = [0, 50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425,
        32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425, 822425, 1222425, 1722425, 2322425,
        3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425, 13822425,
        15522425, 17322425, 19222425, 21222425, 23322425, 25522425, 27822425, 30222425, 32722425,
        35322425, 38072425, 40972425, 44072425, 47472425, 51172425, 55172425, 59472425, 64072425,
        68972425, 74172425, 79672425, 85472425, 91572425, 97972425, 104672425, 111672425];

    const SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];

    function abbreviateNumber(number) {

        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;

        // if zero, we don't need a suffix
        if (tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    };

    //Combat Skill Section

    //Calculating Skills XP & Level;
    let combData = {
        xp: null,
        level: null,
        abbrev: null,
        skill_progression_percentage: null,
        hypermaxed: false,
        greyPercentage: null,
        nextLevelXP: null,
        currentSkillXP: {
            xp: null,
            abbrev: null,
            nextXPAbbrev: null
        }
    };

    combData.xp = SkySimData.data.combatXP

    SkillXPArray.forEach((combatXP) => {
        if ((SkySimData.data.combatXP - combatXP) >= 1) combData.level = SkillXPArray.findIndex((xp) => xp === combatXP);
    });

    combData.currentSkillXP.xp = combData.xp - SkillXPArray[combData.level === null ? 0 : combData.level];
    combData.currentSkillXP.abbrev = abbreviateNumber(combData.xp - SkillXPArray[combData.level === null ? 0 : combData.level]);

    //Changing XP Format;

    combData.abbrev = abbreviateNumber(combData.xp);

    //Setting the next level xp;
    const nextXP = combData.level === 60 ? 'maxed' : combData.level === 59 ? SkillXPArray[combData.level === null ? 1 : combData.level + 1] : SkillXPArray[combData.level === null ? 1 : combData.level + 1];

    combData.nextLevelXP = nextXP == "maxed" ? 'maxed' : abbreviateNumber(nextXP);
    combData.currentSkillXP.nextXPAbbrev = abbreviateNumber(nextXP - SkillXPArray[combData.level === null ? 0 : combData.level]);

    //Calculating progress bar percentage.
    let raw_data = nextXP == "maxed" ? 100 : combData.currentSkillXP.xp / (SkillXPArray[combData.level === null ? 1 : combData.level + 1] - SkillXPArray[combData.level === null ? 0 : combData.level]) * 100;

    if (raw_data >= 100) raw_data = 100;
    else if (raw_data >= 1) {
        raw_data = raw_data;
    };

    //Getting 45% of the bar percentage above;

    const div1 = 45 / 100;

    const percent_of_percentage = div1 * raw_data;

    combData.skill_progression_percentage = combData.level === null ? 0 : percent_of_percentage;

    combData.greyPercentage = combData.level === null ? 45 : 45 - percent_of_percentage;

    //Setting hypermaxed settings;
    if (combData.level >= 50) combData.hypermaxed = true;

    //Mining Skill
    let miningData = {
        xp: null,
        level: null,
        abbrev: null,
        skill_progression_percentage: null,
        hypermaxed: false,
        greyPercentage: null,
        nextLevelXP: null,
        currentSkillXP: {
            xp: null,
            abbrev: null,
            nextXPAbbrev: null
        }
    };

    miningData.xp = SkySimData.data.miningXP;

    SkillXPArray.forEach((miningXP) => {
        if ((SkySimData.data.miningXP - miningXP) >= 1) miningData.level = SkillXPArray.findIndex((xp) => xp === miningXP);
    });

    miningData.currentSkillXP.xp = miningData.xp - SkillXPArray[miningData.level === null ? 0 : miningData.level];
    miningData.currentSkillXP.abbrev = abbreviateNumber(miningData.xp - SkillXPArray[miningData.level === null ? 0 : miningData.level]);

    //Changing XP Format;
    miningData.abbrev = abbreviateNumber(miningData.xp);

    //Setting the next level xp;
    const miningNextXP = miningData.level === 60 ? 'maxed' : miningData.level === 59 ? SkillXPArray[miningData.level === null ? 1 : miningData.level + 1] : SkillXPArray[miningData.level === null ? 1 : miningData.level + 1];

    miningData.nextLevelXP = miningNextXP == "maxed" ? 'maxed' : abbreviateNumber(miningNextXP);
    miningData.currentSkillXP.nextXPAbbrev = abbreviateNumber(miningNextXP - SkillXPArray[miningData.level === null ? 0 : miningData.level]);

    //Calculating progress bar percentage.
    let raw_data_1 = miningNextXP == "maxed" ? 100 : miningData.currentSkillXP.xp / (SkillXPArray[miningData.level === null ? 1 : miningData.level + 1] - SkillXPArray[miningData.level === null ? 0 : miningData.level]) * 100;

    if (raw_data_1 >= 100) raw_data_1 = 100;
    else if (raw_data_1 >= 1) {
        raw_data_1 = raw_data_1;
    };

    //Getting 45% of the bar percentage above;

    const div1_1 = 45 / 100;

    const percent_of_percentage_1 = div1_1 * raw_data_1;

    miningData.skill_progression_percentage = miningData.level === null ? 0 : percent_of_percentage_1;

    miningData.greyPercentage = miningData.level === null ? 45 : 45 - percent_of_percentage_1;

    //Setting hypermaxed settings;
    if (miningData.level >= 50) miningData.hypermaxed = true;

    //Enchanting Skill
    let enchantingData = {
        xp: null,
        level: null,
        abbrev: null,
        skill_progression_percentage: null,
        hypermaxed: false,
        greyPercentage: null,
        nextLevelXP: null,
        currentSkillXP: {
            xp: null,
            abbrev: null,
            nextXPAbbrev: null
        }
    };

    enchantingData.xp = SkySimData.data.enchantXP;

    SkillXPArray.forEach((enchantingXP) => {
        if ((SkySimData.data.enchantXP - enchantingXP) >= 1) enchantingData.level = SkillXPArray.findIndex((xp) => xp === enchantingXP);
    });

    enchantingData.currentSkillXP.xp = enchantingData.xp - SkillXPArray[enchantingData.level === null ? 0 : enchantingData.level];
    enchantingData.currentSkillXP.abbrev = abbreviateNumber(enchantingData.xp - SkillXPArray[enchantingData.level === null ? 0 : enchantingData.level]);

    //Changing XP Format;
    enchantingData.abbrev = abbreviateNumber(enchantingData.xp);

    //Setting the next level xp;
    const enchantingNextXP = enchantingData.level === 60 ? 'maxed' : enchantingData.level === 59 ? SkillXPArray[enchantingData.level === null ? 1 : enchantingData.level + 1] : SkillXPArray[enchantingData.level === null ? 1 : enchantingData.level + 1];

    enchantingData.nextLevelXP = enchantingNextXP == "maxed" ? 'maxed' : abbreviateNumber(enchantingNextXP);
    enchantingData.currentSkillXP.nextXPAbbrev = abbreviateNumber(enchantingNextXP - SkillXPArray[enchantingData.level === null ? 0 : enchantingData.level]);

    //Calculating progress bar percentage.
    let raw_data_2 = enchantingNextXP == "maxed" ? 100 : enchantingData.currentSkillXP.xp / (SkillXPArray[enchantingData.level === null ? 1 : enchantingData.level + 1] - SkillXPArray[enchantingData.level === null ? 0 : enchantingData.level]) * 100;

    if (raw_data_2 >= 100) raw_data_2 = 100;
    else if (raw_data_2 >= 1) {
        raw_data_2 = raw_data_2;
    };

    //Getting 45% of the bar percentage above;

    const div1_2 = 45 / 100;

    const percent_of_percentage_2 = div1_2 * raw_data_2;

    enchantingData.skill_progression_percentage = enchantingData.level === null ? 0 : percent_of_percentage_2;

    enchantingData.greyPercentage = enchantingData.level === null ? 45 : 45 - percent_of_percentage_2;

    //Setting hypermaxed settings;
    if (enchantingData.level >= 50) enchantingData.hypermaxed = true;

    //Farming Section
    let farmingData = {
        xp: null,
        level: null,
        abbrev: null,
        skill_progression_percentage: null,
        hypermaxed: false,
        greyPercentage: null,
        nextLevelXP: null,
        currentSkillXP: {
            xp: null,
            abbrev: null,
            nextXPAbbrev: null
        }
    };

    farmingData.xp = SkySimData.data.farmingXP;

    SkillXPArray.forEach((farmingXP) => {
        if ((SkySimData.data.farmingXP - farmingXP) >= 1) farmingData.level = SkillXPArray.findIndex((xp) => xp === farmingXP);
    });

    farmingData.currentSkillXP.xp = farmingData.xp - SkillXPArray[farmingData.level === null ? 0 : farmingData.level];
    farmingData.currentSkillXP.abbrev = abbreviateNumber(farmingData.xp - SkillXPArray[farmingData.level === null ? 0 : farmingData.level]);

    //Changing XP Format;
    farmingData.abbrev = abbreviateNumber(farmingData.xp);

    //Setting the next level xp;
    const farmingNextXP = farmingData.level === 60 ? 'maxed' : farmingData.level === 59 ? SkillXPArray[farmingData.level === null ? 1 : farmingData.level + 1] : SkillXPArray[farmingData.level === null ? 1 : farmingData.level + 1];

    farmingData.nextLevelXP = farmingNextXP === 'maxed' ? 'maxed' : abbreviateNumber(farmingNextXP);
    farmingData.currentSkillXP.nextXPAbbrev = abbreviateNumber(farmingNextXP - SkillXPArray[farmingData.level === null ? 0 : farmingData.level]);

    //Calculating progress bar percentage.
    let raw_data_3 = farmingNextXP === 'maxed' ? 100 : farmingData.currentSkillXP.xp / (SkillXPArray[farmingData.level === null ? 1 : farmingData.level + 1] - SkillXPArray[farmingData.level === null ? 0 : farmingData.level]) * 100;

    if (raw_data_3 >= 100) raw_data_3 = 100;
    else if (raw_data_3 >= 1) {
        raw_data_3 = raw_data_3;
    };


    //Getting 45% of the bar percentage above;

    const div1_3 = 45 / 100;

    const percent_of_percentage_3 = div1_3 * raw_data_3;


    farmingData.skill_progression_percentage = farmingData.level === null ? 0 : percent_of_percentage_3;

    farmingData.greyPercentage = farmingData.level === null ? 45 : 45 - percent_of_percentage_3;

    // console.log(raw_data_3, percent_of_percentage_3, farmingNextXP, farmingData.currentSkillXP)

    //Setting hypermaxed settings;
    if (farmingData.level >= 50) farmingData.hypermaxed = true;

    //Foraging Section;
    let foragingData = {
        xp: null,
        level: null,
        abbrev: null,
        skill_progression_percentage: null,
        hypermaxed: false,
        greyPercentage: null,
        nextLevelXP: null,
        currentSkillXP: {
            xp: null,
            abbrev: null,
            nextXPAbbrev: null
        }
    };

    foragingData.xp = SkySimData.data.foragingXP;

    SkillXPArray.forEach((foragingXP) => {
        if ((SkySimData.data.foragingXP - foragingXP) >= 1) foragingData.level = SkillXPArray.findIndex((xp) => xp === foragingXP);
    });

    foragingData.currentSkillXP.xp = foragingData.xp - SkillXPArray[foragingData.level === null ? 0 : foragingData.level];
    foragingData.currentSkillXP.abbrev = abbreviateNumber(foragingData.xp - SkillXPArray[foragingData.level === null ? 0 : foragingData.level]);

    //Changing XP Format;
    foragingData.abbrev = abbreviateNumber(foragingData.xp);

    //Setting the next level xp;
    const foragingNextXP = foragingData.level === 60 ? 'maxed' : foragingData.level === 59 ? SkillXPArray[foragingData.level === null ? 1 : foragingData.level + 1] : SkillXPArray[foragingData.level === null ? 1 : foragingData.level + 1];

    foragingData.nextLevelXP = foragingNextXP == "maxed" ? 'maxed' : abbreviateNumber(foragingNextXP);
    foragingData.currentSkillXP.nextXPAbbrev = abbreviateNumber(foragingNextXP - SkillXPArray[foragingData.level === null ? 0 : foragingData.level]);

    //Calculating progress bar percentage.
    let raw_data_4 = foragingNextXP == "maxed" ? 100 : foragingData.currentSkillXP.xp / (SkillXPArray[foragingData.level === null ? 1 : foragingData.level + 1] - SkillXPArray[foragingData.level === null ? 0 : foragingData.level]) * 100;

    if (raw_data_4 >= 100) raw_data_4 = 100;
    else if (raw_data_4 >= 1) {
        raw_data_4 = raw_data_4;
    };

    //Getting 45% of the bar percentage above;

    const div1_4 = 45 / 100;

    const percent_of_percentage_4 = div1_4 * raw_data_4;

    foragingData.skill_progression_percentage = foragingData.level === null ? 0 : percent_of_percentage_4;

    foragingData.greyPercentage = foragingData.level === null ? 45 : 45 - percent_of_percentage_4;

    //Setting hypermaxed settings;
    if (foragingData.level >= 50) foragingData.hypermaxed = true;

    return {
        combat: combData,
        mining: miningData,
        enchanting: enchantingData,
        farming: farmingData,
        foraging: foragingData
    }
}