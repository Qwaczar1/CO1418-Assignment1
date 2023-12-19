function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "closed") {
        x.className = "open";
    } else {
        x.className = "closed";
    }
}

function buildProductsPage() {

    let products;
    fetch("resources/coursework/items.csv").then(response => {
        console.log(response.status);
        response.text().then(response => {
            products = response.split(",,,,,,,,,\"['','','','','']\"\r\n");
            for (let i = 0; i < products.length; i++) {
                products[i] = products[i].split('\n');
                products[i].pop();
                for (let j = 0; j < products[i].length; j++) {
                    products[i][j] = products[i][j].split(',');
                }
            }

            const ProductsDiv = document.getElementById("products");
            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < products[i].length; j++) {

                    let productElement = document.createElement("div");
                    productElement.classList.add("product", "Type" + i, "Visible");

                    let image = document.createElement("img");
                    image.src = "resources/coursework/assignment 1 resources/" + products[i][j][4];
                    image.className = "productImage";
                    image.alt = products[1][1][0] + " Image";
                    productElement.appendChild(image);

                    let productTitle = document.createElement("div");
                    productTitle.innerHTML = products[i][j][0] + " - " + products[i][j][1];
                    productTitle.className = "productTitle";
                    productElement.appendChild(productTitle);

                    let productDescription = document.createElement("div");
                    productDescription.innerHTML = products[i][j][2] + " ";
                    productDescription.className = "productDescription";

                    let productReadMore = document.createElement("a");
                    productReadMore.innerHTML = "Read more";
                    productReadMore.href = "item.html";
                    productReadMore.setAttribute('onclick', 'productToSessionStorage(' + i + ',' + j + ');')
                    productDescription.appendChild(productReadMore);
                    productElement.appendChild(productDescription);

                    let productPrice = document.createElement("div");
                    productPrice.innerHTML = products[i][j][3];
                    productPrice.className = "productPrice";
                    productElement.appendChild(productPrice);

                    let purchaseButton = document.createElement("button");
                    purchaseButton.innerHTML = "Buy Now";
                    purchaseButton.type = "button";
                    purchaseButton.className = "ProductButton";
                    purchaseButton.addEventListener("click", () => {
                        localStorage.setItem("Item" + localStorage.length, i + ',' + j);
                        alert(products[i][j][0] + ' - ' + products[i][j][1] + ' Has been added to your cart!');
                    });
                    productElement.appendChild(purchaseButton);
                    ProductsDiv.appendChild(productElement);
                }
            }
            console.log(products);
        })
    });
    return products;
}

function makeInvisible(classSelection){
    let selection = document.getElementsByClassName(classSelection);
    for (let i = 0; i < selection.length; i++) {
        selection[i].classList.replace("Visible", "InVisible")
    }
}
function makeVisible(classSelection){
    let selection = document.getElementsByClassName(classSelection);
    for (let i = 0; i < selection.length; i++) {
        selection[i].classList.replace("InVisible", "Visible")
    }
}

function Section(i){
    let products = document.getElementsByClassName("product");
    makeInvisible("product");
    makeVisible("Type" + i)
}

function productToSessionStorage(i, j){
    sessionStorage.setItem("product", i + ',' + j);
}

function itemPage(){
    let key =  sessionStorage.getItem("product").split(',');
    let key0 = parseInt(key[0]);
    let key1 = parseInt(key[1]);
    console.log(key);

    let products;
    fetch("resources/coursework/items.csv").then(response => {
        console.log(response.status);
        response.text().then(response => {
            products = response.split(",,,,,,,,,\"['','','','','']\"\r\n");
            for (let i = 0; i < products.length; i++) {
                products[i] = products[i].split('\n');
                products[i].pop();
                for (let j = 0; j < products[i].length; j++) {
                    products[i][j] = products[i][j].split(',');
                }
            }
            console.log(products);
            console.log(products[key0][key1]);

            let itemDiv = document.getElementById("ItemContent")
            let productElement = document.createElement("div");
            productElement.classList.add("Item");
            let image = document.createElement("img");
            image.src = "resources/coursework/assignment 1 resources/" + products[key0][key1][4];
            image.className = "ItemImage";
            image.alt = products[key0][key1][0] + " Image";
            productElement.appendChild(image);
            let productTitle = document.createElement("div");
            productTitle.innerHTML = products[key0][key1][0] + " - " + products[key0][key1][1];
            productTitle.className = "ItemTitle";
            productElement.appendChild(productTitle);
            let productDescription = document.createElement("div");
            productDescription.innerHTML = products[key0][key1][2];
            productDescription.className = "ItemDescription";
            productElement.appendChild(productDescription);
            let productPrice = document.createElement("div");
            productPrice.innerHTML = products[key0][key1][3];
            productPrice.className = "ItemPrice";
            productElement.appendChild(productPrice);
            let purchaseButton = document.createElement("button");
            purchaseButton.innerHTML = "Buy Now";
            purchaseButton.type = "button";
            purchaseButton.className = "ItemButton";
            purchaseButton.addEventListener("click", () => {
                localStorage.setItem("Item" + localStorage.length, key0 + ',' + key1);
                alert(products[i][j][0] + ' - ' + products[i][j][1] + ' Has been added to your cart!');
            });
            productElement.appendChild(purchaseButton);
            itemDiv.appendChild(productElement);
        })
    })
}

function buildCartPage(){

    let products;
    fetch("resources/coursework/items.csv").then(response => {
        console.log(response.status);
        response.text().then(response => {
            products = response.split(",,,,,,,,,\"['','','','','']\"\r\n");
            for (let i = 0; i < products.length; i++) {
                products[i] = products[i].split('\n');
                products[i].pop();
                for (let j = 0; j < products[i].length; j++) {
                    products[i][j] = products[i][j].split(',');
                }
            }
            for (let i = 1; i < localStorage.length; i++) {
                let Key = localStorage.getItem("Item"+i).split(',');

                let key0 = parseInt(Key[0]);
                let key1 = parseInt(Key[1]);

                let cartDiv = document.getElementById("CartContent")
                let productElement = document.createElement("div");
                productElement.classList.add("CartItem");

                let order = document.createElement("div");
                order.innerHTML = i;
                order.className = "CartOrder";
                productElement.appendChild(order);

                let imageDisplay = document.createElement("div");
                imageDisplay.className = "imgDisplay";
                let image = document.createElement("img");
                image.src = "resources/coursework/assignment 1 resources/" + products[key0][key1][4];
                image.className = "CartImage";
                image.alt = products[key0][key1][0] + " Image";
                let color = document.createElement("div");
                color.innerHTML = products[key0][key1][1];
                color.className = "CartColor";
                imageDisplay.appendChild(image);
                imageDisplay.appendChild(color);
                productElement.appendChild(imageDisplay);

                let productTitle = document.createElement("div");
                productTitle.innerHTML = products[key0][key1][0];
                productTitle.className = "CartTitle";
                productElement.appendChild(productTitle);

                let productPrice = document.createElement("div");
                productPrice.innerHTML = products[key0][key1][3];
                productPrice.className = "CartPrice";
                productElement.appendChild(productPrice);

                cartDiv.appendChild(productElement);
            }
        })
    })
}

