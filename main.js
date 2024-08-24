let shop = document.getElementById("shop");

let shopItemsData = [{
    id: "a",
    name: "Formal Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/shirt.jpg",
}, 
{
    id: "b",
    name: "Straight Jeans",
    price: 50,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/jeans.jpg",
}, 
{
    id: "c",
    name: "Kurta",
    price: 90,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/kurta.jpg",
}, 
{
    id: "d",
    name: "Dress Floral Print",
    price: 68,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/dress.jpg",
}];
//if we have data in our basket or if we don't have data we still  want to continue our application instead of breaking
let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x;
        //if we find something then store it if not return empty array
        let search = basket.find((x)=> x.id === id) || []
        return `
        <div id=product-id-${id}" class="item">
            <img width="219" height="290" src="${img}"/>
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined? 0:search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join(""));
};

generateShop();

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
    
    // console.log(basket);
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
    // console.log(basket);
    

    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
   let search = basket.find((x) => x.id === id);
//    console.log(search);
   document.getElementById(id).innerHTML = search.item;
   calculation();
};

let calculation =() => {//we have to calculate all the items and make it appear on top right
    let cartIcon = document.getElementById("cartAmount");
    //one of them is previous no. in x and y
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation();//everytime the application loads this will run