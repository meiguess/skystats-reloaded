module.exports = (lore) => {
  lore = lore.split("\n");
  const lastText = lore[lore.length - 1];
  if (lastText.includes("COMMON") && !lastText.includes("UNCOMMON")) {
    return "COMMON";
  }
  if (lastText.includes("UNCOMMON")) {
    return "UNCOMMON";
  }
  if (lastText.includes("RARE")) {
    return "RARE";
  }
  if (lastText.includes("EPIC")) {
    return "EPIC";
  }
  if (lastText.includes("LEGENDARY")) {
    return "LEGENDARY";
  }
  if (lastText.includes("MYTHIC")) {
    return "MYTHIC";
  }
  if (lastText.includes("SUPREME")) {
    return "SUPREME";
  }
  if (lastText.includes("SPECIAL") && !lastText.includes("VERY")) {
    return "SPECIAL";
  }
  if (lastText.includes("VERY") && lastText.includes("SPECIAL")) {
    return "VERY_SPECIAL";
  }
  if (lastText.includes("EXCLUSIVE")) {
    return "EXCLUSIVE";
  }
}