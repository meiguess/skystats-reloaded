/* document.querySelector("#notFavorized").addEventListener("click", () => {
  document.querySelector("#notFavorized").style.display = "none";
  document.querySelector("#favorized").style.display = "inline";
});

document.querySelector("#favorized").addEventListener("click", () => {
  document.querySelector("#favorized").style.display = "none";
  document.querySelector("#notFavorized").style.display = "inline";
}); */
const allPieces = document.querySelectorAll(".piece");
allPieces.forEach((e) => {
  if (!e.classList.contains("piece-NONE-bg")) {
    e.addEventListener("mouseover", (event) => {
      let pos = event.target.getClientRects()[0];
      console.log("hover");
      document.querySelector("#stats_content").style.top = (pos.top - 250) + "px";
      document.querySelector("#stats_content").style.left = (pos.left - 400) + "px";
      document.querySelector("#stats_content").style.display = "block";
    });
  }
});

allPieces.forEach((e) => {
  e.addEventListener("mouseout", () => {
    document.querySelector("#stats_content").style.display = "none";
  });
});