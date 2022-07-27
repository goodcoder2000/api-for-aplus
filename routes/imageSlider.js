require("dotenv").config();
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;


let db;
MongoClient.connect(process.env.URI, async (err, client) =>{
    if(err) throw err
    db = await client.db('aplus');
})

//image slider

router.get('/', (req, res) =>{
    db.collection('imageslider').find().toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result)
    })
})


module.exports = router;