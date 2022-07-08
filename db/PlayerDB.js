const MongoDB = require("mongoose");

const SchemaDB = MongoDB.Schema({
    UUID: String,
    PlayerData: Object
});

module.exports = MongoDB.model("Player_DB", SchemaDB);