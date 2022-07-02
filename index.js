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

const dotenv = require("dotenv").config();
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
  res.sendFile(path.join("/static/index.html"));
});

App.post("/", async (req, res) => {
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

    console.log(userData);
  }
});

App.listen(80);
