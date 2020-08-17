const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/dados";

const app = express();
app.use(express.json());
app.use(cors());

mongoClient.connect(uri, (err, client)=>{
  if(err) return console.log(err);
  db = client.db('air');
  app.get('/', (req, res) => {
    var data = db.collection('dados');
  
    data.find().toArray((err, docs) => {
      if(err)
        res.status(404).send('Not')
      else res.json(docs)
    })
  
  });

  // pegar no maximo os ultimos req.query.max registros
  app.get('/showCounted', (req, res)=>{
    var data = db.collection('dados');
    
    data.find().sort({_id:-1}).limit(parseInt(req.query.max)).toArray((err, docs)=>{
      if(err)
        res.status(404).send('Not Found');
      else res.json(docs)
    });
  });

  app.listen(8000, () =>{
    console.log('Rodando')
  })
}); 
