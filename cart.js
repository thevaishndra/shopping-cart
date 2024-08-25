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
            let {id, item} = x;//destructuring it
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search;//destructuring an object
            return `
            <div class="cart-item">
            <img width="100" height="130" src=${img} alt=""/>
            <div class="details" >
             <div class="title-price-x">
             <h4 class="title-price">
             <p>${name}</p>
             <p class="cart-item-price">&#8377 ${price}</p>
             </h4>
             <i onclick='removeItem(${id})' class="bi bi-x-lg"></i>
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
    totalAmount();
 };

 let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id != selectedItem.id)
    generateCartItems();//rerender our components
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
 }

 let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
 }

 let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x + y, 0)// x is previous no. y is next no. add these two nos
        // console.log(amount);
        label.innerHTML = `
        <h2>Total Amount : &#8377 ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick='clearCart()' class="removeall">Clear Cart</button>
        `
    }
    else return;
 }

 totalAmount();