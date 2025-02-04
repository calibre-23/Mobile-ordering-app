import   menuArray   from './data.js';
let basket = [];
console.log(menuArray)

document.addEventListener('click', (event)=>{
    if(event.target.dataset.add){
        console.log(event.target.dataset.add);
        const itemName=event.target.dataset.add;
        addMenuItemToBasket(itemName)
        console.log(basket)
    }
})

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
        <h3 class="order-name">${basketItems.name}</h3>
        <button class="order-btn" data-remove="${basketItems.name}">remove</button>
        <p class="order-price">${basketItems.price}</p>
        </div>`
    })
    let totalHtml=""
    if(basket.length >0){
        totalHtml +=`<div class="total1">
        <h3 class="total-price1">Total: £${totalCost()}</h3>
        </div>`
      }
    

    return basketHtml + totalHtml;
    
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