import {
  addToPot,
  triggerMenuRefresh,
  addFilter,
  refreshShoppingIcon,
  addToCart,
  toggleActiveColumn,
} from "../../../js/menulogic";
import MenuPageTemplate from "./menu.hbs";
import SideMenuTemplate from "../../../partials/components/sidemenu.hbs";

export default class MenuPage {
  constructor() {
    this.app = document.querySelector("#app");
    this.render();
  }
  listen() {
    const optionItems = document.querySelectorAll(
      ".optionsmenu__options__item"
    );

    optionItems.forEach(singleItem => {
      let ingredient = singleItem.id;
      singleItem.addEventListener("click", () => addFilter(ingredient));
    });
    window.addEventListener("scroll",()=>{
      const navbar=document.querySelector(".navbar");
      if(window.innerWidth < 730 && window.scrollY > 50){
       
        if(navbar!=null){
          navbar.classList.add("scrolled-navbar");
        }
      
      }else{
        if(navbar!=null){
          navbar.classList.remove("scrolled-navbar");
        }

      }
    });

    const menuButton=document.querySelector("#menu-button");
    if(menuButton!=null){
      menuButton.addEventListener("click",()=>{
        if(window.innerWidth < 730){
          window.scrollTo({top:0,behavior:"smooth"});
        }
      });
    }

    window.emitter.on('trigger-menu-refresh', () => { console.log("EVENT HIER TRIGGERD");
      this.updateSideMenu();});
  }

  updateSideMenu() {
    let menuList= triggerMenuRefresh();
    const sidemenu = document.querySelector(".sidemenu");
    sidemenu.innerHTML = SideMenuTemplate({ menuitems: menuList });
    toggleActiveColumn();
    const plusbuttons=document.querySelectorAll(".sidemenu .add-button");
    if(plusbuttons.length>0){

      for(let button of plusbuttons){
        button.addEventListener("click", (e)=>{
          if(e.target.classList.contains("add-button")){
            e.preventDefault();
            addToCart(e.target.dataset.dishnum);
            if(document.querySelector(".shopping-cart")!=null){
              window.emitter.emit('trigger-cart-refresh');
            }
          }
        });
      }

    }
  }

  render() {

    this.app.innerHTML = MenuPageTemplate({ menuitems: window.menuCard });
    this.listen();

    this.updateSideMenu();

    let list = Object.values(sessionStorage);
    list.forEach(ingredient => {
      addToPot(ingredient);
    });

    triggerMenuRefresh();
    refreshShoppingIcon();

  }
}
