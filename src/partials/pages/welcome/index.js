import welcomeTemplate from "./welcome.hbs";
import { buttonClick, allergensCheck } from "../../../js/sidebar-buttons";
import { resetMenuData, considerVeggie} from "../../../js/menulogic";

export default class WelcomePage {
    constructor() {
        this.render();
    }

    listen() {
        buttonClick();
        allergensCheck();
        const openMenuBtn=document.querySelector(".welcome-page__middle-column__search-box__search-button");

        openMenuBtn.addEventListener("click",()=>{
            const veggieCheckbox=document.querySelector(".welcome-page__middle-column__search-box__checkbox__checkmark--veggie");
            const veganCheckbox=document.querySelector(".welcome-page__middle-column__search-box__checkbox__checkmark--vegan");

            const searchbar=document.querySelector(".welcome-page__search-input");
            if(searchbar.value!=""){
                sessionStorage.setItem(searchbar.value,searchbar.value);
            }
            if(veggieCheckbox.checked){
                window.vegetarian=true;
            }
            else if(veganCheckbox.checked){
                window.vegan=true;
            }
           considerVeggie();
        });
        const closeBtn=document.querySelector(".close-sidebar");
        closeBtn.addEventListener("click",()=>{
            const leftButton = document.querySelector('#allergens-button');
            leftButton.classList.toggle("active-column");
            const column=document.querySelector(".welcome-page__left-column");
            column.classList.toggle("invisible-sidebar");
        });
        const closeDealBtn=document.querySelector(".close-deal");
        closeDealBtn.addEventListener("click",()=>{
            const rightButton = document.querySelector('#deal-button');
            rightButton.classList.toggle("active-column");
            const column=document.querySelector(".welcome-page__right-column");
            column.classList.toggle("invisible-sidebar");
        });

        const welcomeContent=document.querySelector(".welcome-page");
        if(welcomeContent!=null){
            welcomeContent.addEventListener("keypress",(event)=>{
                if (event.keyCode === 13) {
                
                    event.preventDefault();
        
                   openMenuBtn.click();
                  }
            });
        }
    }
    
    render() {
        resetMenuData();
        const app = document.querySelector("#app");
        app.innerHTML = welcomeTemplate();
        this.listen();
    }
}