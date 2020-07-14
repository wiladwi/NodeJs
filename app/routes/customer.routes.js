module.exports = app => {

    const customers = require ('../controllers/customer.controller.js');

    //create  a new customer
    app.post("/customers",customers.create);

    //Retrieve all customer
    app.get("/customers", customers.findAll);

    // Retrieve single customer
    app.get("/customers/:customerId",customers.findOne);

    // uPdate a single Customer
    app.put("/customers/:customerId",customers.update);

    //Delete a customer with customer ID
    app.delete("customers/:customerId",customers.delete);
    
    // delete All customers

    app.delete("/customers",customers.delete);
    
};

