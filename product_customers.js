var fs = require('fs');
var array = fs.readFileSync('orders.csv').toString().split("\n");
let  productCustomers = [];
for (let i=1; i<array.length;i++) {
    var parts = array[i].trim().split(",");
    if (parts[0]) {
        product = parts[2].split(" ");
        for (let j = 0; j<product.length; j++) {
            productCustomers.push({
                customer: parts[1],
                product: product[j]
            })
        }
    }
}

array = fs.readFileSync('products.csv').toString().split("\n");
var output = [];
output.push("id,customer_ids");

for (let i=1; i<array.length; i++) {
    var parts = array[i].trim().split(",");
    var customers = [];
    for (let j = 0; j<productCustomers.length; j++){
        if (parts[0] == productCustomers[j].product) {
            customers.push(productCustomers[j].customer);
        }
    }
    customers = [...new Set(customers)];
    customers.sort();
    output.push(parts[0]+","+customers.join(" "));
}
fs.writeFileSync('product_customers.csv', output.join("\n"));