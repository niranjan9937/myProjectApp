const mysql=require('mysql');
const express=require('express');
const path=require('path');
const { throwDeprecation } = require('process');

const app=express();
app.use(express.json());
//my sql connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Niranjan@2002',
    database:'myCollege'
});
db.connect((err)=>{
    if(err)throw err;
    console.log('connected to mysql');
});
//server html form
app.get('/',(req,res)=>{
    res.sendFile(path.joinn(__dirname,'index.html'));
});
app.use(express.urlencoded({extended:true}));
//insert student
app.post('/student',(req,res)=>{
    const{id,name}=req.body;
    const sql='INSERT INTO student(id,name)VALUES(?,?)';
    db.query(sql,[id,name],(err,result)=>{
        if(err)
            console.error('Error Inserting data',err);
        console.error(' Inserted student',id);
        res.send('student successfully added to the db');
    });
});

//start server
app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});