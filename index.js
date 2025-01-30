import menuArray from './data.js';

function getMenuHtml(){
    let menuHtml="";
    menuArray.forEach((menuItem)=>{            
        menuHtml +=`
        <div class="menu-item">
            <p>${menuItem.emoji}</p>
            <h3>${menuItem.name}</h3>
            <p>${menuItem.ingredients.join(', ')}</p>
            <p>${menuItem.price}</p>
            <button>+<button>
            </div>
    `           

     })


    return menuArray;
}

function render(){
    document.getElementbyId('menu').innerHTML=getMenuHtml();
}

render()