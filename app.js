const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port=80;
//express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());
//pug specific stuff
app.set('view engine', 'pug');
app.set('pug_files', path.join(__dirname,'pug_files'));
//endpoints
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('../pug_files/home.pug', params);
})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('../pug_files/contact.pug', params);
})
app.post('/', (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let phone_number=req.body.phone_number;
    let orders=req.body.orders;
    let address=req.body.address;
    console.log("Given Order :-");
    console.log(req.body);
    let customer=`The name of the client is ${name} ,his/her email is ${email}, phone numbr is ${phone_number}, address = ${address} and orders =${orders}`;
    fs.writeFileSync('record.txt',customer);
    console.log(customer);
    const params={'message': 'Your order has been received. For more info please contact on number:2983781283'};
    res.status(200).render('../pug_files/contact.pug', params);
    
})
//starting the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})