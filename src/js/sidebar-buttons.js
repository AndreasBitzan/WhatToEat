export function allergensShowHide() {
    let sideBar = document.querySelector('.welcome-page__left-column');
    sideBar.classList.toggle('invisible-sidebar');
}

export function dealShowHide() {
    let sideBar = document.querySelector('.welcome-page__right-column');
    sideBar.classList.toggle('invisible-sidebar');
}

export function buttonClick() {
    const leftButton = document.querySelector('#allergens-button');
    const rightButton = document.querySelector('#deal-button');
    leftButton.addEventListener("click", ()=>{allergensShowHide();
    leftButton.classList.toggle("active-column");
    });
    rightButton.addEventListener("click", ()=>{dealShowHide();
        rightButton.classList.toggle("active-column");
    });
}

export function allergensCheck() {
    const allergenCheckboxes = document.querySelectorAll('.welcome-page__left-column__allergens-list__checkbox__checkmark');
    allergenCheckboxes.forEach(checkbox=> {
        checkbox.addEventListener("click", (e)=> {
         
           let parentLi=checkbox.parentNode.parentNode;
           parentLi.classList.toggle("highlight-checkbox");
            console.log(e);
            console.log(e.target);
            addAllergenFilter(checkbox.dataset.allergen);
        });
    });
    //window.allergensList = allergenCheckboxes.dataset.allergen;
    console.log(window.allergensList);
    console.log("CHECK IS WORKING");
}

export function addAllergenFilter(allergen) {
    if (!window.allergensList.has(allergen))
    {
        window.allergensList.set(allergen, allergen);
    }
    else {
        window.allergensList.delete(allergen);
    }
    console.log(window.allergensList);
}