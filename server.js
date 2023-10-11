const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();


app.use(bodyParser.urlencoded({extended:false}));

app.get('/login',(req,res)=>
{
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="GET">
	<input id="username" type="text" name"title">
	<button type="submit">Login</button>
    </form>`)
});

app.get('/',(req,res)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log(err);
            data = 'No chats Exist';
        }
        else if(data == ''){
            data ='No chats exist';
        }
        res.send(`'${data}'<br><form action="/" method="POST" onSubmit="document.getElementById('username').value= localStorage.getItem('username')">
        <input type="text" name="message" id="message"></input>
        <input type="hidden" name="username" id="username"></input>
        <button type="submit">Send</button>
        </form>`);
    });
});

app.post('/',(req,res)=>{
    console.log(req.body.message);
    console.log(req.body.username);
    fs.writeFile('message.txt',`${req.body.username} : ${req.body.message}`,{flag:'a'},(err)=>{
        err? console.log(err) : res.redirect('/');
    });
});

app.listen(4000);
