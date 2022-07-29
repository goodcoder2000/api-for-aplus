require("dotenv").config();
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");


let db;
MongoClient.connect(process.env.URI, async (err, client) =>{
    if(err) throw err
    db = await client.db('aplus');
})


// REGISTER USER

router.post('/register', (req, res) =>{
    const data = req.body;
    const { phoneno } = req.body;

    db.collection('users').findOne({phoneno: phoneno})
    .then(result =>{
        // checking user already exits
        if(!result){
            db.collection('users').insertOne(data)
            .then((result) => { 
                res.status(201).json({message: "register success"})
            })
        }   else {
            res.status(201).json({message: "This Phone has already Exits"})
        }
    })

})

// LOGIN USER
router.post('/login', (req, res) =>{
    const { phoneno, password} = req.body;

    db.collection('users').findOne({phoneno: phoneno, password: password})
    .then((result) =>{
        if(result){
            jwt.sign({result}, 'thisismgmg9',
        (error, token) =>{
            res.status(201).json({token, user: result})
        }
        )
        } else {
            res.status(201).json({error: "user not found"})
        }
    })
})


// all users

router.get('/', (req, res) =>{
    db.collection('users').find().toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result)
    } )
})

//single users

router.get('/:id', async (req, res) =>{
    const id = await req.params.id;
    db.collection('users').findOne({_id: ObjectId(id)})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({err: err}))
})

//

router.patch('/:id/:method/', async(req, res) =>{
    const id  = await req.params.id;
    const method = await req.params.method;
    const data = await req.body;
    if(method === "push"){
        db.collection('users').updateOne({_id: ObjectId(id)}, {$addToSet: {cart: data}})
        .then(result =>{
            res.status(200).json(result)
        })
    }
})



module.exports = router;