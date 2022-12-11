export function hamburgerMenu() {
  const hamburgerBtn = document.getElementsByClassName("openbtn1")[0];
  const hamburgerNav = document.getElementsByClassName("header-nav")[0];
  hamburgerBtn.addEventListener("click", function () {
    if (hamburgerBtn.classList.contains("active")) {
      hamburgerBtn.classList.remove("active");
      hamburgerNav.classList.remove("active");
    } else {  
      hamburgerBtn.classList.add("active");
      hamburgerNav.classList.add("active");
    }
  });
}
