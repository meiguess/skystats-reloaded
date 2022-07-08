document.querySelector("#notFavorized").addEventListener("click", () => {
  document.querySelector("#notFavorized").style.display = "none";
  document.querySelector("#favorized").style.display = "inline";
});

document.querySelector("#favorized").addEventListener("click", () => {
  document.querySelector("#favorized").style.display = "none";
  document.querySelector("#notFavorized").style.display = "inline";
});
