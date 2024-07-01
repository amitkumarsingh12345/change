const db = require('../db');
module.exports = new db.model('category',{
     name: String,
     discription: String
   }
)