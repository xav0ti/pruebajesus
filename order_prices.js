var fs = require('fs');
var array = fs.readFileSync('products.csv').toString().split("\n");
let products = {};
for (let i=1; i<array.length;i++) {
    var parts = array[i].trim().split(",");
    if (parts[0]) {
        products[parts[0]] = {
            name: parts[1],
            cost: +parts[2]
        }
    }
}

array = fs.readFileSync('orders.csv').toString().split("\n");
var output = [];
output.push("id,euros");

for (let i=1; i<array.length; i++){
    var parts = array[i].trim().split(",");
    if (parts[0]) {
        var acum = 0;
        var orderProducts = parts[2].split(" ");
        for (let j=0; j<orderProducts.length;j++) {
            acum += products[orderProducts[j]].cost;
        }
        output.push(parts[0]+"," + acum);
    }
}

fs.writeFileSync('order_prices.csv', output.join("\n"));