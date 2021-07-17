var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.3zspm.mongodb.net/Assignment4?retryWrites=true&w=majority";

router.get('/', async function (req, res, next) {
  const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  try {
    await client.connect();
    const cardsList = await client.db('Assignment4').collection('Cards').find();
    let result = [];
    await cardsList.forEach(card => result.push(card));
    res.send(result);
  } finally {
    client.close()
  }
});

router.get('/:name', async function (req, res, next) {
  const name = req.params.name;
  const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  try {
    await client.connect();
    const card = await client.db('Assignment4').collection('Cards').findOne({ name: name });
    res.send(card);
  } finally {
    client.close()
  }
});

router.post('/', async function (req, res, next) {
  const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  try {
    await client.connect();
    await client.db('Assignment4').collection('Cards').insertOne(req.body);
    const cardsList = await client.db('Assignment4').collection('Cards').find();
    let result = [];
    await cardsList.forEach(card => result.push(card));
    res.send(result);
  } finally {
    client.close()
  }
});

router.delete('/:name', async function (req, res, next) {
  const name = req.params.name;
  const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  try {
    await client.connect();
    await client.db('Assignment4').collection('Cards').deleteOne({ name: name });
    const cardsList = await client.db('Assignment4').collection('Cards').find();
    let result = [];
    await cardsList.forEach(card => result.push(card));
    res.send(result);
  } finally {
    client.close()
  }
});

module.exports = router;
