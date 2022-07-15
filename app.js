require('dotenv').config();
const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const app = express();


app.listen(process.env.PORT, (req, res) =>{
    console.log("server is running at 3000")
})

const url = "mongodb+srv://goodcoder:1082018mgmg@cluster0.h6blw.mongodb.net/?retryWrites=true&w=majority";
let db;
MongoClient.connect(url, (err, client) =>{
    if(err) throw err
    db = client.db('aplus');
})

app.get('/api/shoplists', (req, res) =>{
    db.collection('shoplists').find().toArray((err, result) =>{
        res.status(200).json(result)
    })
})

