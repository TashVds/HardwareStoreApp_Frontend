const mongoose = require('mysql2');

const customerSchema =  mysql.createConnection({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;