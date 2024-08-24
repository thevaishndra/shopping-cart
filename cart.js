let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation =() => {//we have to calculate all the items and make it appear on top right
    let cartIcon = document.getElementById("cartAmount");
    //one of them is previous no. in x and y
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            console.log(x);
            let {id, item} = x;//destructuring it
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
            <div class="cart-item">
            <img width="100" height="110" src=${search.img} alt=""/>
            <div class="details" >
             <div class="title-price-x">
             <h4 class="title-price">
             <p>${search.name}</p>
             <p class="cart-item-price">&#8377 ${search.price}</p>
             </h4>
             <i class="bi bi-x-lg"></i>
             </div>
             <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>&#8377 ${item * search.price}</h3>
            </div>
            </div>
            `;
        }).join(""));
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to home</button>
        </a>
        `;
        
    }
};
generateCartItems()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
//if we have not added any item in basket then we will push
    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }//but if the item already exists in the basket we will just increment it
    else {
        search.item += 1;
    }
    
    generateCartItems()
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search.item === undefined) return;
    if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems()//used to rerender the cards
    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
 //    console.log(search);
    document.getElementById(id).innerHTML = search.item;
    calculation();
 };