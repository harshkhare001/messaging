const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { LocalStorage } = require('node-localstorage');
var localStorage = require('localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch');

const app = express();


app.use(bodyParser.urlencoded({extended:false}));

app.use('/login',(req,res,next)=>{
    //console.log("in the middle");
    res.send('<form action="/" method="POST"><label>User:</label><input type="text" name="title"><button type="submit">Login</button></form>')
    //next();
})

app.use('/',(req,res,next)=>{
    
    var name = req.body.title;
    console.log(name);
    //console.log(name);
    localStorage.setItem('username',name.toString());
    //console.log(localStorage.getItem('username'));
    const data = fs.readFileSync('message.txt')
    res.write(data);
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')

})

app.use('/message',(req,res,next)=>{
    //const message = req.body.message;
    console.log(req.body);
    const savemsg = message;
    console.log(savemsg);
    fs.appendFileSync('message.txt',savemsg);
    res.redirect('/');
})


// app.use('/',(req,res,next)=>{
//     //console.log('in another middleware');
//     res.send('<h1>Hello World from Express.Js<h1>')
// })

app.listen(4000);