const express = require('express')
const app = express()
//app.use(express.json());
const port = 3000
const bodyParser =require('body-parser')




// parse requests of content-type: application/json


    // app.use(function (req, res, next) {
    //     res.header('Content-Type', 'application/json');
    //     next();
    // }); 
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({message :'First Node Rest APIs'})
});

require("./app/routes/customer.routes.js")(app);

app.listen(port, () => console.log(`Example app listening on port 3000`))