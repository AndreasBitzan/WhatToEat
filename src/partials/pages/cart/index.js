import shoppingCartTemplate from "./cart.hbs";
import { refreshShoppingIcon, removeFromCart, getShoppingCartItems, toggleActiveMenuItem } from "../../../js/menulogic";
import MenuPage from "../menu";


export default class ShoppingCartPage {
    constructor() {
      
      this.render();
    }

    listen(){
      console.log("LISTEN SHOPPING CART TRIGGERED");
       
        window.emitter.on('trigger-cart-refresh', () => { this.updateShoppingCart();});
    }
    updateShoppingCart(){
      console.log("UPDATE SHOPPING CART TRIGGERED");
        const cartPage = document.querySelector(".options-container");
        if(cartPage==null){
            new MenuPage();
            this.render();
        }
        cartPage.innerHTML = shoppingCartTemplate({cart: getShoppingCartItems()});
        let cartItems=document.querySelectorAll(".shopping-cart__item");
        for(let element of cartItems){
          element.addEventListener("click",(e)=>{
            if(e.target.classList.contains("remove-button")){
              e.preventDefault();
              removeFromCart(e.target.dataset.dishnum);
                this.updateShoppingCart();
            }
          });
        }
        refreshShoppingIcon();
    }

    render(){
      console.log("RENDER SHOPPING CART TRIGGERED");
        toggleActiveMenuItem();
        this.listen();
        this.updateShoppingCart();
        if(window.innerWidth<730){
          window.scrollTo(0,0);
        }
        
    }

}