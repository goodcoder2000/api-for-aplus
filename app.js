require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.use(express.json())
app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
}));


app.listen(process.env.PORT, (req, res) =>{
    console.log("server is running at 3000")
})

const url = "mongodb+srv://goodcoder:1082018mgmg@cluster0.h6blw.mongodb.net/?retryWrites=true&w=majority";
let db;
MongoClient.connect(url, (err, client) =>{
    if(err) throw err
    db = client.db('aplus');
})

// get shop category

app.get('/api/shoplists/:category', async (req, res) =>{
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

// get singel shop

app.get('/api/shoplists/:id', async (req, res) =>{
    const id = await req.params.id;

    db.collection('shoplists').findOne({_id: ObjectId(id)})
    .then((result) =>{
        res.status(200).json(result)
    })
})

// add new shop

app.post('/api/shoplists', async (req, res) =>{
    const data = await req.body;
    db.collection('shoplists').insertOne(data)
    .then((result) =>{
        res.status(201).json(result)
    })
})

// add new menu for shop

app.patch('/api/shoplists/:id/:method', async (req, res) =>{
    const id = await req.params.id;
    const method = req.params.method;
    const data = req.body;

    if(method === "push"){
        db.collection('shoplists').updateOne({_id: ObjectId(id)}, {$addToSet: {menu: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    }
})

