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

// get shop category

router.get('/:category', async (req, res) =>{
    const category = await req.params.category;
    
    if(category === "bakey"){
        db.collection('shoplists').find({"category": "bakey"}).toArray((err, result) =>{
            res.status(200).json(result)
        })
    } else if(category === "drink"){
        db.collection('shoplists').find({"category": "drink"}).toArray((err, result) =>{
            res.status(200).json(result)
        })
    } else if(category === "noddle"){
        db.collection('shoplists').find({"category": "noddle"}).toArray((err, result) =>{
            res.status(200).json(result)
        })
    } else if(category === "atoke"){
        db.collection('shoplists').find({"category": "atoke"}).toArray((err, result) =>{
            res.status(200).json(result)
        })
    } else if(category === "akin"){
        db.collection('shoplists').find({"category": "akin"}).toArray((err, result) =>{
            res.status(200).json(result)
        })
    } else if(category === "chicken"){
        db.collection('shoplists').find({"category": "chicken"}).toArray((err, result) =>{
            res.status(200).json(result)
        })
    }
}
)  

// add new shop

router.post('/', async (req, res) =>{
    const data = await req.body;
    db.collection('shoplists').insertOne(data)
    .then((result) =>{
        res.status(201).json(result)
    })
})

// add new menu for shop

router.patch('/:id/:method', async (req, res) =>{
    const id = await req.params.id;
    const method =await req.params.method;
    const data =await req.body;

    if(method === "push"){
        db.collection('shoplists').updateOne({_id: ObjectId(id)}, {$addToSet: {menu: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    }
})


module.exports = router;