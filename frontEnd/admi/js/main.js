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

 const container = document.querySelector('.container')

 /*crear los div para los institutuos 
const createCards = (numOfCards) => {

let count = 1 

while(count <= numOfCards){

const div = document.createElement('div')
divElement.setAttribute("class", `card-${i}`);
div.classList.add(`card-${count}`)
container.append(div)
count++

}



}*/

createCards(4)
