import drinkMenuTemplate from "./drinks.hbs";
import { refreshShoppingIcon, addToCart, filterDrinkList ,triggerMenuRefresh, toggleActiveColumn } from "../../../js/menulogic";
import SideMenuTemplate from "../../components/sidemenu.hbs";
export default class DrinkMenuPage {
    constructor() {
      
      this.render();
    }
    listen(){

          const drinkCategories=document.querySelectorAll(".optionsmenu__categories__category--drinks");
 
          drinkCategories.forEach(category=>{
            category.addEventListener("click",(e)=>{
    
              this.applyListToSideMenu(filterDrinkList(e.target.dataset.drinktype));
            });
          });
          this.findPlusButtons();

        //  window.emitter.on('trigger-menu-refresh', () => { this.updateSideMenu();});
        
    }

    applyListToSideMenu(list){
      const sidemenu = document.querySelector(".sidemenu");
      sidemenu.innerHTML = SideMenuTemplate({ menuitems: list });
      toggleActiveColumn("drinks");
      this.findPlusButtons();
      //this.listen();
    }
    findPlusButtons(){
      console.log("PLUS");
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
    updateSideMenu() {

        let menuList= triggerMenuRefresh("drinks");
        const sidemenu = document.querySelector(".sidemenu");
        sidemenu.innerHTML = SideMenuTemplate({ menuitems: menuList });
       // this.listen();
      }
    render(){
    console.log("DRINK PAGE RENDER() TRIGGERED");
    const optionsContainer = document.querySelector(".options-container");

    optionsContainer.innerHTML= drinkMenuTemplate();
   
    this.updateSideMenu();

    triggerMenuRefresh("drinks");
    refreshShoppingIcon();
    toggleActiveColumn("drinks");

    this.listen();
    if(window.innerWidth<730){
      window.scrollTo(0,0);
    }
        
    }

    

}