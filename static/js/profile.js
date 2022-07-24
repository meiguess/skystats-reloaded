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
      let pos = event.target.getBoundingClientRect();
      let rarity = e.classList[1].replace("piece-", "").replace("-bg", "");


      let itemName = e.classList[e.classList.length - 1].split("_").join(" ");

      let nItemSplit = itemName.split("");
      let nLastIndex = -2;

      nItemSplit = nItemSplit.map((itemItr, index) => {
        if (itemItr === "§") {
          let itrCode = "§" + nItemSplit[index + 1];
          nLastIndex = index;
          if (itrCode === "§l") {
            return "</span><span class='" + itrCode + "'>";
          } else if (itrCode === "§k") {
            return "</span><span class='obfuscated'>";
          } else {
            return "</span><span style='color: var(--" + itrCode + ");'>"
          }
        } else if (index - 1 === nLastIndex) {
          return '';
        } else {
          return itemItr;
        }
      });

      itemName = nItemSplit.join("");

      document.querySelector("#stats_content_item_name").innerHTML = "<span><" + itemName.substring(2);

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
            if (itrCode === "§l") {
              return "";
            }else {
              return "</span><span style='color: var(--" + itrCode + ");'>"
            }
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

      document.querySelector("#stats_content").style.display = "block";
      let height = document.querySelector("#stats_content").offsetHeight;

      document.querySelector("#stats_content").style.top = ((pos.top + window.scrollY) - height / 2) + "px";
      document.querySelector("#stats_content").style.left = (pos.left - 700) + "px";
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
    document.querySelector(".item-name").classList.remove("piece-EXCLUSIVE-bg");
    document.querySelector("#stats_content").style.display = "none";
  });
});

document.querySelectorAll(".nav-item").forEach((e) => {
  e.addEventListener("click", (elem) => {
    elem = elem.target;
    elem.setAttribute("aria-current", "true");
    if (elem.id === "armornav") {
      document.querySelector("#invnav").removeAttribute("aria-current");
      document.querySelector("#wardrobenav").removeAttribute("aria-current");
      document.querySelector("#dungeonsnav").removeAttribute("aria-current");
    }
    if (elem.id === "invnav") {
      document.querySelector("#armornav").removeAttribute("aria-current");
      document.querySelector("#wardrobenav").removeAttribute("aria-current");
      document.querySelector("#dungeonsnav").removeAttribute("aria-current");
    }
    if (elem.id === "wardrobenav") {
      document.querySelector("#invnav").removeAttribute("aria-current");
      document.querySelector("#armornav").removeAttribute("aria-current");
      document.querySelector("#dungeonsnav").removeAttribute("aria-current");
    }
    if (elem.id === "dungeonsnav") {
      document.querySelector("#invnav").removeAttribute("aria-current");
      document.querySelector("#armornav").removeAttribute("aria-current");
      document.querySelector("#wardrobenav").removeAttribute("aria-current");
    }
  });

  e.addEventListener("mouseover", (elem) => {
    elem = elem.target;
    elem.setAttribute("aria-current", "true");
  });

  e.addEventListener("mouseout", (elem) => {
    elem = elem.target;
    elem.removeAttribute("aria-current");
  });
});