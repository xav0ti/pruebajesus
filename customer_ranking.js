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

var array = fs.readFileSync('customers.csv').toString().split("\n");
let output = [];
let customers=[];
output.push("id, firstname,lastname,total_euros");
for (let i=1; i<array.length; i++) {
    var parts = array[i].trim().split(",");
    if (parts[0]) {
        var acum = 0;
        for (let j = 0; j<productCustomers.length; j++){
            if (parts[0] == productCustomers[j].customer) {
                acum+= products[productCustomers[j].product].cost;
            }
        }
        customers.push({
            customer_id: parts[0],
            firstname: parts[1],
            lastname: parts[2],
            total: acum,
        });
    }
}

customers.sort((a, b) => {
    if (a.total > b.total) {
        return -1;
    }
    if (a.total < b.total) {
        return 1;
    }
    return 0;
});

for (let i=0; i < customers.length; i++) {
    output.push(customers[i].customer_id+","+customers[i].firstname+","+customers[i].lastname+","+customers[i].total);
}

fs.writeFileSync('customer_ranking.csv', output.join("\n"));