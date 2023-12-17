function myFunction() {
    var x = document.getElementById("topNav");
    if (x.className === "closed") {
        x.className = "open";
    } else {
        x.className = "closed";
    }
}

fetch("resources/coursework/items.csv").then(response => {
    console.log(response.status);
    response.text().then(response => {
        let  products = response.split(",,,,,,,,,\"['','','','','']\"");
        for (let i = 0; i <  products.length; i++) {
             products[i] =  products[i].split('\n');
            for (let j = 0; j < products[i].length; j++) {
                products[i][j] = products[i][j].split(',');
            }
        }
        console.log(products);

    })
});