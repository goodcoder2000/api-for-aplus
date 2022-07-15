require('dotenv').config();
const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const app = express();


app.listen(process.env.PORT, (req, res) =>{
    console.log("server is running at 3000")
})

const url = "mongodb://localhost:27017";
let db;
MongoClient.connect(url, (err, client) =>{
    if(err) throw err
    db = client.db('aplus');
})

app.get('/api/shoplist', (req, res) =>{
    db.collection('shoplist').find().toArray((err, result) =>{
        res.status(200).json(result)
    })
})

