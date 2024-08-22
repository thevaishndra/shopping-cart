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

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x;
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
                        <div id=${id} class="quantity">0</div>
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
    console.log(selectedItem.id);
}
let decrement = (id) => {
    let selectedItem = id;
    console.log(selectedItem.id);
}
let update = () => {}
