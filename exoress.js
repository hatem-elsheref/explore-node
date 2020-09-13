const express=require('express');
const app=express();
app.set('view engine','ejs');
const post=1999;
app.listen(post,()=>{
    console.log('server is  running now ...')
});

app.get('/students',(req,res)=>{
        res.render('students',{
            name:'hatem mohamed elsheref',
            age:21,
            address:'tanta'
        });
    }
);

app.get('/',(req,res)=>{res.sendFile(__dirname+'/index.html');});
app.get('/about',(req,res)=>{res.sendFile(__dirname+'/about.html');});
app.get('/contact',(req,res)=>{res.sendFile(__dirname+'/contact.html');});
app.get('/blog',(req,res)=>{res.sendFile(__dirname+'/index.html');});
app.get('/blog/1',(req,res)=>{res.sendFile(__dirname+'/index.html');});