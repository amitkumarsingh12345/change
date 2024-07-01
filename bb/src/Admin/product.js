const db = require('../db');
const cartschema = new db.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    qty: String,
    discription: String
});
const product = new db.model('product',cartschema);
module.exports = product;
