export const addFilter = ingredient => {
  if (sessionStorage.getItem(ingredient) == null) {
    if (sessionStorage.length < 4) {
      fillPot(ingredient);
      sessionStorage.setItem(ingredient, ingredient);
      window.emitter.emit("trigger-menu-refresh");
    }
  } else {
    removeFilter(ingredient);
  }
};

export const removeFilter = ingredient => {
  let ingredientsList = document.querySelector(
    ".options-container__pot-container__ingredients_list"
  );
  let ingredientFilter = document.querySelector(`#filter_${ingredient}`);

  const optionsItem = document.querySelector(`#${ingredient}`);
  if(optionsItem != null){
  optionsItem.classList.toggle("active-option-item");
  }
  sessionStorage.removeItem(ingredient);
  ingredientsList.removeChild(ingredientFilter);

  window.emitter.emit("trigger-menu-refresh");
};

export const fillPot = ingredient => {
  let ingredientsList = document.querySelector(
    ".options-container__pot-container__ingredients_list"
  );
  const optionsItem = document.querySelector(`#${ingredient}`);
  if (optionsItem != null) {
    optionsItem.classList.toggle("active-option-item");
  }
  const listItem = document.createElement("li");
  listItem.innerHTML = ingredient;
  listItem.id = `filter_${ingredient}`;

  const minusButton = document.createElement("button");
  minusButton.innerHTML = "-";
  minusButton.addEventListener("click", () => removeFilter(ingredient));
  listItem.appendChild(minusButton);

  ingredientsList.appendChild(listItem);
};

export const addToPot = ingredient => {
  fillPot(ingredient);

  triggerMenuRefresh();
};

export const triggerMenuRefresh = type => {
  let activeFilters = Object.values(sessionStorage);
  console.log("THIS TRIGGER");
  if (type == "drinks") {
    let filteredMenu = [];
    if (activeFilters.length > 0) {
      for (let i = 0; i < activeFilters.length; i++) {
        filteredMenu = filteredMenu.concat(
          filterMenu(activeFilters[i], filteredMenu)
        );
      }
    } else {
      filteredMenu = filteredMenu.concat(window.drinkList);
    }
    return filteredMenu;
  } else {
    let filteredMenu = [];
    if (activeFilters.length > 0) {
      for (let i = 0; i < activeFilters.length; i++) {
        filteredMenu = filteredMenu.concat(
          filterMenu(activeFilters[i], filteredMenu)
        );
      }
      // console.log("FILTERED  OBJECT ");
      // console.log(filterMenu(activeFilters[0]));
      // console.log("FILTERED MENU OBJECT ");
      // console.log(filteredMenu);
    } else {
      filteredMenu = filteredMenu.concat(window.foodList);
    }
    return filteredMenu;
  }
};

function filterMenu(filter, currentList) {
  return window.menuCard.filter(el => {
    return (
      (el.name.includes(`${filter}`) ||
        el.short_desc.includes(`${filter}`) ||
        el.long_desc.includes(`${filter}`) ||
        el.course.includes(`${filter}`)) &&
      !currentList.includes(el)
    );
  });
}

export const createShoppingList = keys => {
  let shoppingList = [];
  let dishes = window.menuCard;
  for (let key of keys) {
    shoppingList = shoppingList.concat(
      dishes.filter(dish => dish.type_id === key)
    );
  }
  return shoppingList;
};

export const addToCart = id => {
  if (window.shoppingcart.get(id) != undefined) {
    let cartObject = window.shoppingcart.get(id);
    cartObject++;
    window.shoppingcart.set(id, cartObject);
  } else {
    window.shoppingcart.set(id, 1);
  }

  refreshShoppingIcon();
};

export const removeFromCart = id => {
  let item = window.shoppingcart.get(id);
  console.log("THE ITEM IS:" + item);
  if (item == 1) {
    window.shoppingcart.delete(id);
  } else {
    item--;
    window.shoppingcart.set(id, item);
  }
  refreshShoppingIcon();
};

export const refreshShoppingIcon = () => {
  const carticon = document.querySelector("#shopping-cart-icon");
  if (document.querySelector(".navbar__item__counter") == null) {
    const icon = document.createElement("span");
    icon.classList.add("navbar__item__counter");
    if (window.shoppingcart.size > 0) {
      icon.innerHTML = getShoppingCount();
      carticon.appendChild(icon);
    }
  } else {
    const icon = document.querySelector(".navbar__item__counter");
    icon.innerHTML = getShoppingCount();
    if (getShoppingCount() == 0) {
      carticon.removeChild(icon);
    }
  }
};

const getShoppingCount = () => {
  let sum = 0;
  for (let value of window.shoppingcart.values()) {
    sum += 1 * value;
  }
  return sum;
};

export const getShoppingCartItems = () => {
  let itemsList = [];
  for (var [key, value] of window.shoppingcart) {
    let currentItem = findDish(key);
    if (value > 1) {
      currentItem.count = value;
    } else {
      delete currentItem.count;
    }
    itemsList.push(currentItem);
  }
  return itemsList;
};

export const findDish = id => {
  return window.menuCard.find(el => el.type_id == id);
};

export const toggleActiveMenuItem = () => {
  const activeDish = document.querySelector(".active-dish");
  if (activeDish != undefined) {
    activeDish.classList.toggle("active-dish");
  }
};

export const toggleActiveColumn = type => {
  const activeColumn = document.querySelector(".active-column");
  const foodElement = document.querySelector(".sidemenu__header__btn--food");
  const drinksElement = document.querySelector(
    ".sidemenu__header__btn--drinks"
  );

  if (type === "food" || activeColumn == undefined) {
    if (activeColumn != undefined) {
      drinksElement.classList.toggle("active-column");
    }
    foodElement.classList.toggle("active-column");
  }
  if (type === "drinks") {
    foodElement.classList.toggle("active-column");
    drinksElement.classList.toggle("active-column");
  }
};

export const filterFood = () => {
  return window.menuCard.filter(item => item.type == "food");
};

export const filterDrinks = () => {
  return window.menuCard.filter(item => item.type == "drink");
};

export const filterDrinkList = category => {
  console.log("FILTER DRINK LIST");
  return window.drinkList.filter(el => {
    return (
      el.name.includes(`${category}`) ||
      el.short_desc.includes(`${category}`) ||
      el.long_desc.includes(`${category}`)
    );
  });
};

export const highlightActiveItem = id => {
  let activeItem = document.querySelector(`#item_${id}`);
  activeItem.classList.toggle("active-dish");
};

export const considerAllergens = () => {
  if (window.allergensList.size != 0) {
    let allergensList = window.allergensList;
    let sortedMenuCard = [];

    let allAllergens = "";
    for (let key of allergensList.keys()) {
      allAllergens += `${key}`;
    }
    
    sortedMenuCard = sortedMenuCard.concat(
      window.menuCard.filter(item => {
        console.log("Current Item:");
        let display = true;
        try{

        let itemAllergens="none";
        if(!Array.isArray(item.allergens)){
         itemAllergens = item.allergens.split(",");
        }else{
          itemAllergens=item.allergens;
        }
        itemAllergens.forEach(allergen => {
          if (allAllergens.includes(allergen)) {
            display = false;
          }
        });
        }
        catch(e){
          display=false;
          console.log(`Split did not work this time ${e}`);
        }
        return display;
      })
    );

    console.log(sortedMenuCard);
    window.menuCard = sortedMenuCard;
    window.foodList = filterFood();
    window.drinkList = filterDrinks();
  } 
};

export const resetMenuData = () => {
  window.menuCard = window.originalFile;
  window.foodList = filterFood();
  window.drinkList = filterDrinks();
};

//TODO Create Filter by Method with any parameters
export const considerVeggie = () => {
  console.log("CONSIDER VEGGIE TRIGGERD");
  console.log(`VEGAN: ${window.vegan} VEGETARIAN:${window.vegetarian}`);
  if (window.vegetarian || window.vegan) {
    let veggieList = [];
    veggieList = veggieList.concat(
      window.menuCard.filter(el => {
        if (window.vegan) {
          if (el.diet == "vegan") {
            return true;
          }
        } else {
          if (el.diet == "vegetarian" || el.diet == "vegan") {
            return true;
          }
        }
        return false;
      })
    );
    window.menuCard = veggieList;
    window.foodList = filterFood();
    window.drinkList = filterDrinks();
  } 
  considerAllergens();

  console.log(window.menuCard);
};
