import   menuArray   from './data.js';
let basket = [];
console.log(menuArray)
function getMenuHtml(){
    let menuHtml=" ";
    menuArray.forEach((menuItem)=>{            
        menuHtml +=`<div class="menu-item">
            <p class="emoji">${menuItem.emoji}</p>
            <h3 class="name">${menuItem.name}</h3>
            <p class="ingredients">${menuItem.ingredients.join(", ")}</p>
            <p class="price">${menuItem.price}</p>
            <button class="btn" data-add="${menuItem.id}"=>+</button>
            </div>`

     })
    return menuHtml;
}

document.addEventListener('click', (event)=>{
    if (event.target.classList.contains('btn')){
        console.log(event.target.id)
    }
})

function handleAddToCart(event){
    const menuItem = menuArray.find((menuItem)=>menuItem.id===parseInt(event.target.id));
    basket.push(menuItem);
    console.log(basket)

}

function render(){
    document.getElementById('menu').innerHTML=getMenuHtml();
}

render()