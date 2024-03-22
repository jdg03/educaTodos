document.addEventListener("DOMContentLoaded", () =>{

  const toogleBotton = document.querySelector(".navbar_toogle-btn");
  const mobileMenu = document.querySelector(".navbar_mobile-menu");

  const toogleMenu = () => {
      mobileMenu.style.display =
         mobileMenu.style.display === "none" || mobileMenu.style.display === ""
      ? "flex"
      : "none"
    };

    const hideMenuResize  = () =>
    {
      mobileMenu.style.display ="none"
    }
    toogleBotton.addEventListener("click", toogleMenu);
    window.addEventListener("resize", hideMenuResize);
    window.addEventListener("load", hideMenuResize)
 });