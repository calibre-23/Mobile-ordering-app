import   menuArray   from './data.js';
const logInForm =document.getElementById('card-details')

let basket = [];
console.log(menuArray)

document.addEventListener('click', (event)=>{
    if(event.target.dataset.add){
        console.log(event.target.dataset.add);
        const itemName=event.target.dataset.add;
        addMenuItemToBasket(itemName)
        console.log(basket)
    }
    else if(event.target.dataset.remove){
        console.log(event.target.dataset.remove)
        const itemName=event.target.dataset.remove;
        removeMenuItemFromBasket(itemName)
        console.log(basket)
    }
    else if(event.target.classList.contains('complete-order')){
        displayModal()
        render()
    }
})

logInForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    // Define fullName here before logging it
    const fullName = document.querySelector('input[name="fullName"]').value;
    console.log(fullName);
    
    orderConfirmation(fullName); // Pass fullName as an argument
    render();
});



function addMenuItemToBasket(itemName){
    const  targetMenuObj=menuArray.find((menuItem)=>menuItem.name===itemName)
    if(targetMenuObj){
        basket.push(targetMenuObj);
    }else{
        console.error(`Could not find menu item with name ${itemName}`)
    }
    render();
    totalCost()
}

function removeMenuItemFromBasket(itemName){
    const itemIndex=basket.findIndex((basketItem)=>basketItem.name===itemName)
    if(itemIndex!== -1){
        basket.splice(itemIndex,1)
    }else{
        console.error(`Could not find menu item with name ${itemName}`)
    }
    render();
    totalCost()
    }


function getMenuHtml(){
    let menuHtml="";
    menuArray.forEach((menuItem)=>{            
        menuHtml +=`<div class="menu-item">
            <p class="emoji">${menuItem.emoji}</p>
            <span class="trial">
            <h3 class="name">${menuItem.name}</h3>
            <p class="ingredients">${menuItem.ingredients.join(", ")}</p>
            <p class="price">£${menuItem.price}</p>
            </span>
            <button class="btn" data-add="${menuItem.name}">+</button>
            </div>`

     })
    return menuHtml;
}

function getBasketHtml(){
    let basketHtml="";
    if(basket.length >0){
        basketHtml +=`<div class="order-item">
        <h1 class="header1">Your order</h1><br>
        </div>`
    }
    basket.forEach((basketItems)=>{
        basketHtml +=`<div class="order-item2">
        <h3 class="order-name">${basketItems.name} <button class="order-btn" data-remove="${basketItems.name}">remove</button></h3>
        <p class="order-price">£${basketItems.price}</p>
        </div>`
    })
    let totalHtml=""
    if(basket.length >0){
        totalHtml +=`<div class="total1">
        <h3 class="total-price1">Total: £${totalCost()}</h3>
        </div>
        <div>
        <button class="complete-order">Complete Order</button></div>`
    }
    

    return basketHtml + totalHtml;
    
}
function displayModal(){
    document.getElementById('modal').style.display='block'

}

function orderConfirmation(fullName){ 
    console.log("Order Confirmation triggered!");  // Check if it's being called
    document.getElementById('modal').style.display = 'none';
    basket = [];

    // Check if confirmation element exists before updating
    const confirmationElement = document.getElementById('confirmation');
    if (confirmationElement) {
        confirmationElement.innerHTML = `<p>Thank you ${fullName} for your order!</p>`;
    } else {
        console.error("Error: Element with ID 'confirmation' not found.");
    }
}




function totalCost(){
    let total=0;
    basket.forEach((basketItems)=>{
        total += basketItems.price
    })
    return total
}

function render(){
    document.getElementById('menu').innerHTML=getMenuHtml()
    document.getElementById('order').innerHTML= getBasketHtml()

}



render()