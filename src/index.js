import "./sass/main.scss";
import Navigo from "navigo";
import Emitter from "tiny-emitter";
import csvFile from "./menumap.csv";
import MenuPage from "./partials/pages/menu";
import DrinkPage from "./partials/pages/drinks";
import ShoppingCartPage from "./partials/pages/cart";
import dishTemplate from "./partials/pages/dish/dish.hbs";
import { addToCart,resetMenuData, filterDrinks,findDish, highlightActiveItem, considerVeggie, filterFood, toggleActiveMenuItem} from "./js/menulogic";
import WelcomePage from "./partials/pages/welcome";
import "./img/favicon.ico";

importAll(require.context("./img", false, /\.(png|jpe?g|svg)$/));
importAll(require.context("./img/dishes", false, /\.(png|jpe?g|svg)$/));
importAll(require.context("./fonts", false, /\.(woff|woff2)$/));

function importAll(r) {
  let images = {};
  r.keys().map(item => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

window.menuCard = csvFile;
window.originalFile=csvFile;
console.log("THE MENU");
console.log(window.menuCard);
window.foodList = filterFood();
window.drinkList= filterDrinks();
window.shoppingcart=new Map();
window.allergensList = new Map();
window.vegetarian=false;
window.vegan=false;

//Initial router setup
const config = {
  root: null,
  useHash: true,
  hash: "#"
};
const router = new Navigo(config.root, config.useHash, config.hash);

window.emitter = new Emitter();

router
  .on({
    menu: () => {
      considerVeggie();
      new MenuPage();
    },
    "dish/:id": params => {
      toggleActiveMenuItem();
      highlightActiveItem(params.id);
      const options = document.querySelector(".options-container");

      let activeFilters = Object.values(sessionStorage);
      if (options != undefined) {
        let selectedDish = findDish(params.id);
        console.log("DISH BEING CALLED");
        console.log(selectedDish);
        console.log(activeFilters);
        console.log(selectedDish.allergens);

        if(!Array.isArray(selectedDish.allergens)){
          selectedDish.allergens=selectedDish.allergens.split(",");
        }

        if (activeFilters.length == 0) {
          options.innerHTML = dishTemplate({
            dish: selectedDish
          });
        } else {
          options.innerHTML = dishTemplate({
            dish: selectedDish,
            filters: activeFilters
          });
        }
      }
      const addButton=document.querySelector(".dish-container .add-button");
      addButton.addEventListener("click",()=>addToCart(params.id));
      if(window.innerWidth<730){
        window.scrollTo(0,0);
      }
    },
    cart: () => {
      new ShoppingCartPage();
    },
    drinks:()=>{
      sessionStorage.clear();
      new DrinkPage();
    },
    "*": () => {
      window.vegan = false;
      window.vegetarian = false;
      window.shoppingcart.clear();
      window.allergensList=new Map();
      sessionStorage.clear();
      resetMenuData();
      new WelcomePage();
    }
},
).resolve();
