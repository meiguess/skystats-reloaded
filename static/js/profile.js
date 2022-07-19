/* document.querySelector("#notFavorized").addEventListener("click", () => {
  document.querySelector("#notFavorized").style.display = "none";
  document.querySelector("#favorized").style.display = "inline";
});

document.querySelector("#favorized").addEventListener("click", () => {
  document.querySelector("#favorized").style.display = "none";
  document.querySelector("#notFavorized").style.display = "inline";
}); */

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

const allPieces = document.querySelectorAll(".piece");
allPieces.forEach((e) => {
  if (!e.classList.contains("piece-NONE-bg")) {
    e.addEventListener("mouseover", (event) => {
      let pos = event.target.getClientRects()[0];
      let rarity = e.classList[1].replace("piece-", "").replace("-bg", "");
      let itemName = e.classList[e.classList.length - 1].split("_").join(" ");
      document.querySelector("#stats_content_item_name").innerHTML = itemName.substring(2);

      let color = getComputedStyle(document.body).getPropertyValue("--" + itemName.substring(0, 2));
      document.querySelector("#stats_content_item_name").style.color = color;

      const lore = event.target.getAttribute("lore").split("\n");

      document.querySelector(".item-lore").innerHTML = "";

      const codesArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
      "d", "e", "f", "k", "l", "m", "n", "o", "r"];

      lore.forEach((item) => {
        let loreRow = document.createElement("span");
        loreRow.classList.add("lore-row");

        let itemSplit = item.split("");
        let lastIndex = -2;

        itemSplit = itemSplit.map((itemItr, index) => {
          if (itemItr === "§") {
            let itrCode = "§" + itemSplit[index + 1];
            lastIndex = index;
            return "<span style='color: var(--" + itrCode + ");'>";
          } else if (index - 1 === lastIndex) {
            return '';
          } else {
            return itemItr;
          }
        });

        item = itemSplit.join("");

        loreRow.innerHTML = item;


        document.querySelector(".item-lore").appendChild(loreRow);
      });

      document.querySelector(".item-name").classList.add("piece-" + rarity + "-bg");
      document.querySelector("#stats_content").style.top = (pos.top - 250) + "px";
      document.querySelector("#stats_content").style.left = (pos.left - 400) + "px";
      document.querySelector("#stats_content").style.display = "block";
    });
  }
});

allPieces.forEach((e) => {
  e.addEventListener("mouseout", () => {
    document.querySelector(".item-name").classList.remove("piece-COMMON-bg");
    document.querySelector(".item-name").classList.remove("piece-UNCOMMON-bg");
    document.querySelector(".item-name").classList.remove("piece-RARE-bg");
    document.querySelector(".item-name").classList.remove("piece-EPIC-bg");
    document.querySelector(".item-name").classList.remove("piece-LEGENDARY-bg");
    document.querySelector(".item-name").classList.remove("piece-MYTHIC-bg");
    document.querySelector(".item-name").classList.remove("piece-SUPREME-bg");
    document.querySelector(".item-name").classList.remove("piece-SPECIAL-bg");
    document.querySelector(".item-name").classList.remove("piece-VERY_SPECIAL-bg");
    document.querySelector("#stats_content").style.display = "none";
  });
});