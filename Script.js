function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "closed") {
        x.className = "open";
    } else {
        x.className = "closed";
    }
}

function loadProducts() {
    const ProductsDiv = document.getElementById("products");
    fetch("resources/coursework/items.csv").then(response => {
        console.log(response.status);
        response.text().then(response => {
            let products = response.split(",,,,,,,,,\"['','','','','']\"\r\n");
            for (let i = 0; i < products.length; i++) {
                products[i] = products[i].split('\n');
                products[i].pop();
                for (let j = 0; j < products[i].length; j++) {
                    products[i][j] = products[i][j].split(',');
                }
            }
            console.log(products);
            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < products[i].length; j++) {
                    let productElement = document.createElement("div");
                    productElement.className = "product";
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
                    productDescription.innerHTML = products[i][j][2];
                    productDescription.className = "productDescription";
                    productElement.appendChild(productDescription);
                    let productPrice = document.createElement("div");
                    productPrice.innerHTML = products[i][j][3];
                    productPrice.className = "productPrice";
                    productElement.appendChild(productPrice);
                    ProductsDiv.appendChild(productElement)
                }
            }
        })
    });
}