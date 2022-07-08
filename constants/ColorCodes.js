let colorCodes = [];

["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
    "d", "e", "f", "k", "l", "m", "n", "o", "r"].forEach((code) => colorCodes.push(`§${code}`));

module.exports = {
    colorCodes: colorCodes,
    colorAttribute: [
        "#000000",
        "#0000AA",
        "#00AA00",
        "#00AAAA",
        "#AA0000",
        "#AA00AA",
        "#FFAA00",
        "#AAAAAA",
        "#555555",
        "#5555FF",
        "#55FF55",
        "#55FFFF",
        "#FF5555",
        "#FF55FF",
        "#FFFF55",
        "#FFFFFF",
        "obfuscated",
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "reset"
    ]
};