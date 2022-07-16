const SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];

// Importing mongoose
const mongoose = require('mongoose');
const PlayerDB = require("./db/PlayerDB");

// dotenv
const dotenv = require("dotenv").config();

// Connect to database
const URL = process.env.URL;
mongoose.connect(URL);

// Beta 
const BETA_KEYS = process.env.BETA_KEYS.split(", ");

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

const path = require("path");
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const API_KEY = process.env.API_KEY;
const type = {
  PLAYER_INFO: "PLAYER_INFO",
  PLAYER_ITEMS: "PLAYER_ITEMS",
};
const uuid = "f7ccf53e-8acd-466a-ab8a-087ebefe1452";

const App = express();

App.set("view engine", "ejs");
App.set("views", path.join(__dirname, "/static"));

App.use(bodyParser.json());
App.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
App.use(express.json());
App.use(
  express.urlencoded({
    extended: true,
  })
);

App.use(express.static(path.join(__dirname, "/static")));

App.get("/", (req, res) => {
  res.status(200).render("index");
});

App.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/profile.html"));
});

App.get("/usernotfound/:username/:type", (req, res) => {
  const object = {
    error: `${
      req.params.type == "invalid"
        ? `Invalid username: ${req.params.username}`
        : req.params.type == "neverjoined"
        ? `That player has never joined SkySim!`
        : `Failed to resolve username, Please make sure the player exist with the username: ${req.params.username}`
    }`,
  };

  res.status(200).send(object);
});

App.post("/", async (req, res) => {
  if (!BETA_KEYS.includes(req.body.SkySim_BetaCode)) {
    const object = {
      error: `${
        `Wrong Beta Key`
      }`,
    };
  
    res.status(200).send(object);
  }
  if (
    !req.body.SkySim_Username ||
    typeof req.body.SkySim_Username !== "string" ||
    req.body.SkySim_Username.length > 16 ||
    req.body.SkySim_Username.length < 3
  )
    return res.redirect(
      `/usernotfound/${encodeURIComponent(req.body.SkySim_Username)}/invalid`
    );

  const UUID = await axios({
    method: "get",
    url: `https://playerdb.co/api/player/minecraft/${req.body.SkySim_Username}`,
  }).catch((err) => null);

  if (!UUID || !UUID.data || UUID.data.success === false)
    return res.redirect(
      `/usernotfound/${encodeURIComponent(req.body.SkySim_Username)}/notfound`
    );

  if (UUID && UUID.data && UUID.data.code == "player.found") {
    const SkySimData = await axios({
      method: "get",
      url: `https://api.skysim.sbs/?key=${API_KEY}&type=PLAYER_INFO&param=${UUID.data?.data?.player?.id}`,
    }).catch((err) => null);

    const PlayerInventory = await axios({
      method: "get",
      url: `https://api.skysim.sbs/?key=${API_KEY}&type=PLAYER_ITEMS&param=${UUID.data?.data?.player?.id}`,
    }).catch((err) => null);

    if (SkySimData.data.error || PlayerInventory.data.error)
      return (
        res.redirect(
          `/usernotfound/${encodeURIComponent(
            req.body.SkySim_Username
          )}/neverjoined`
        ),
        console.log(SkySimData.data.error || PlayerInventory.data.error)
      );

    //Setting User Data
    let userData = {
      profile: {
        username: req.body.SkySim_Username,
        uuid: UUID.data?.data?.player,
      },
      coins: {
        raw: SkySimData.data.coins,
        abbrev: abbreviateNumber(SkySimData.data.coins),
        bank: {
          raw: SkySimData.data.bankCoins,
          abbrev: abbreviateNumber(SkySimData.data.bankCoins),
        },
      },
      bits: {
        raw: SkySimData.data.bits,
        abbrev: abbreviateNumber(SkySimData.data.bits),
      },
      stats: {
        health: SkySimData.data.health,
        defense: SkySimData.data.defense,
        strength: SkySimData.data.strength,
        crit: {
          chance: SkySimData.data.critChance,
          damage: SkySimData.data.critDamage,
        },
        speed: SkySimData.data.speed,
        mana: SkySimData.data.intelligence,
        attackSpeed: SkySimData.data.attackSpeed,
        magicFind: SkySimData.data.magicFind,
        ferocity: SkySimData.data.ferocity,
        abilityDamage: SkySimData.data.abilityDamage,
        effectiveHP: null,
      },
      skills: {
        combat: null,
        mining: null,
        enchanting: null,
        farming: null,
        foraging: null,
      },
      slayers: {
        revenant: {
          slayerXP: SkySimData.data.slayerXP[0],
          slayerXPAbbrev: abbreviateNumber(SkySimData.data.slayerXP[0]),
          slayerLevel: null,
          progression: 0,
          greyProgression: 45,
          offset: null,
          xp: {
            current: 0,
            next: 0,
          },
        },
        tarantula: {
          slayerXP: SkySimData.data.slayerXP[1],
          slayerXPAbbrev: abbreviateNumber(SkySimData.data.slayerXP[1]),
          slayerLevel: null,
          progression: 0,
          greyProgression: 45,
          xp: {
            current: 0,
            next: 0,
          },
        },
        sven: {
          slayerXP: SkySimData.data.slayerXP[2],
          slayerXPAbbrev: abbreviateNumber(SkySimData.data.slayerXP[2]),
          slayerLevel: null,
          progression: 0,
          greyProgression: 45,
          xp: {
            current: 0,
            next: 0,
          },
        },
        voidgloom: {
          slayerXP: SkySimData.data.slayerXP[3],
          slayerXPAbbrev: abbreviateNumber(SkySimData.data.slayerXP[3]),
          slayerLevel: null,
          progression: 0,
          greyProgression: 45,
          xp: {
            current: 0,
            next: 0,
          },
        },
      },
      weight: null,
      catacombs: {
        classes: {
          archer: {
            level: null,
            XP: null,
            XPAbbrev: null,
          },
          berserker: {
            level: null,
            XP: null,
            XPAbbrev: null,
          },
          healer: {
            level: null,
            XP: null,
            XPAbbrev: null,
          },
          tank: {
            level: null,
            XP: null,
            XPAbbrev: null,
          },
          mage: {
            level: null,
            XP: null,
            XPAbbrev: null,
          },
        },
        catacombXP: SkySimData.data["cataXP"],
        catacombXPAbbrev: abbreviateNumber(SkySimData.data["cataXP"]),
        catacombLevel: null,
      },
    };

    // Estimated RNG Calculation (by rsnx)
    const calculateRNG = await require("./calculations/estimated_rng");
    

    //Skill System
    const SkillData = await require("./Functions/CalculatingSkillData")(
      SkySimData
    );

    if (typeof SkillData != "object") return res.status(502);

    userData["skills"].combat = SkillData.combat;
    userData["skills"].mining = SkillData.mining;
    userData["skills"].enchanting = SkillData.enchanting;
    userData["skills"].farming = SkillData.farming;
    userData["skills"].foraging = SkillData.foraging;

    userData.weight = await require("./calculations/weight")(userData);

    const effHP = await require("./calculations/ehp")(userData);

    userData["stats"].effectiveHP = {
      hp: effHP,
      abbrev: abbreviateNumber(effHP),
    };

    //Modifying Equipped Armor;
    const ArmorAttribute = require("./Constants/ArmorTextures");
    let items = [];
    let itemsWithoutReforge = [];

    const colorCodes = require("./Constants/ColorCodes").colorCodes;

    /* await PlayerInventory.data.armor.forEach((armor) => {
      colorCodes.forEach((colorCode) => {
        const regex = new RegExp(colorCode, "gim");

        if (armor === null) items.push(null);
        if (armor !== null) {
          if (armor.name.match(regex)) {
            const index = colorCodes.findIndex((code) => code === colorCode);

            const colorAttribute = require("./Constants/ColorCodes")
              .colorAttribute[index];

            const replacedArmor = armor.name.replace(regex, "");

            return items.push(`${replacedArmor}-${colorAttribute}`);
          }
        }
      });
    });

    items = [items[3], items[2], items[1], items[0]];

    PlayerInventory.data.armor.forEach(async (armor) => {
      if (armor === null) return itemsWithoutReforge.push(null);
      if (armor.material?.toLowerCase() != "skull_item") {
        if (armor !== null) {
          const attr = armor.type?.toLowerCase();

          const actualTextures = ArmorAttribute[attr];

          itemsWithoutReforge.push({
            name: armor.name,
            itemType: armor.type?.toLowerCase(),
            itemTexture: actualTextures,
          });
        }
      } else if (armor.material?.toLowerCase() == "skull_item") {
        if (armor !== null) {
          const raw_texture = armor.texture?.split("/")[4];

          const apiLink = `https://mc-heads.net/head/${raw_texture}`;

          itemsWithoutReforge.push({
            name: armor.name,
            itemType: armor.type?.toLowerCase(),
            itemTexture: apiLink,
          });
        }
      }
    });

    itemsWithoutReforge = [
      itemsWithoutReforge[3],
      itemsWithoutReforge[2],
      itemsWithoutReforge[1],
      itemsWithoutReforge[0],
    ]; */

    const armor = PlayerInventory.data.armor;

    //Slayer Sections

    const SlayerData = await require("./calculations/slayer")(userData);

    userData["slayers"]["revenant"]["slayerLevel"] =
      SlayerData["zombielvl"] === null ? 0 : SlayerData["zombielvl"];
    userData["slayers"]["sven"]["slayerLevel"] =
      SlayerData["svenlvl"] === null ? 0 : SlayerData["svenlvl"];
    userData["slayers"]["voidgloom"]["slayerLevel"] =
      SlayerData["voidgloomlvl"] === null ? 0 : SlayerData["voidgloomlvl"];
    userData["slayers"]["tarantula"]["slayerLevel"] =
      SlayerData["tarantulalvl"] === null ? 0 : SlayerData["tarantulalvl"];

    const RevenantSlayerProgression =
      await require("./Functions/CalculatingSlayerData")(userData, 1);

    userData["slayers"]["revenant"]["progression"] =
      RevenantSlayerProgression["completetion"];
    userData["slayers"]["revenant"]["greyProgression"] =
      RevenantSlayerProgression["greyProgress"];
    userData["slayers"]["revenant"]["offset"] =
      RevenantSlayerProgression["offset"];
    userData["slayers"]["revenant"]["xp"]["current"] =
      RevenantSlayerProgression["currentXP"];
    userData["slayers"]["revenant"]["xp"]["next"] =
      RevenantSlayerProgression["nextLevelXP"];

    const TarantulaSlayerProgression = await require("./Functions/CalculatingSlayerData")(userData, 2);

    userData["slayers"]["tarantula"]["progression"] = TarantulaSlayerProgression["completetion"];
    userData["slayers"]["tarantula"]["greyProgression"] = TarantulaSlayerProgression["greyProgress"];
    userData["slayers"]["tarantula"]["offset"] = TarantulaSlayerProgression["offset"];
    userData["slayers"]["tarantula"]["xp"]["current"] = TarantulaSlayerProgression["currentXP"];
    userData["slayers"]["tarantula"]["xp"]["next"] = TarantulaSlayerProgression["nextLevelXP"];

    const LoreToRarityFunction = await require("./Functions/LoreToRarity");

    const IntToArgbFunction = await require("./Functions/IntToARGB");

    const MinecraftMaterials = await require("./Constants/MinecraftMaterials");

    //Rendering page.

    const fetchingPlayer = await PlayerDB.findOne({
      UUID: UUID.data?.data?.player?.id
    }).catch((err) => null);

    if (fetchingPlayer) fetchingPlayer.updateOne({
      UUID: fetchingPlayer.UUID,
      PlayerData: userData
    }).then(() => {
      // console.log("Updated Data!")
    });

    if (!fetchingPlayer) new PlayerDB({
        UUID: UUID.data?.data?.player?.id,
        PlayerData: userData
    }).save();

    let allTimeVisits = 100;
    let uniqueVisits = 35;

    res.render("profile", {
      data: SkySimData.data,
      username: req.body.SkySim_Username,
      uuidData: UUID.data?.data?.player,
      constants: {
        colorCodes: colorCodes,
      },
      userData: userData,
      playerInventory: PlayerInventory.data,
      playerArmor: {
        equippedItems:
          items.filter((item) => item !== null).length > 0 ? true : false,
        withReforge: items,
        noReforge: itemsWithoutReforge,
      },
      armor: armor,
      visits: {
        alltime: allTimeVisits,
        unique: uniqueVisits,
      },
      wardrobe: PlayerInventory.data.wardrobe,
      loreToRarity: LoreToRarityFunction,
      armorAttr: ArmorAttribute,
      intToRGB: IntToArgbFunction,
      minecraftMaterials: MinecraftMaterials,
      wardrobeSelected: PlayerInventory.data.wardrobeSelected,
    });
  }
});

App.listen(80);
