const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Addcraft
// F1RBPg8BD78ISVRY
// middleware

app.use(cors());
app.use(express.json());

// mongo
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scvnlgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const AddCraftCollection = client.db('AddCraftDB').collection('AddCraft');
    const AddSubcategoryCollection = client
      .db('AddCraftDB')
      .collection('AddSubcategory');

    app.get('/AddCraft', async (req, res) => {
      const cursor = AddCraftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/AddCraft', async (req, res) => {
      const cursor = AddCraftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/mycraft', async (req, res) => {
      const cursor = AddCraftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // app.get('/mycraft/:email', async (req, res) => {
    //   const result = await AddCraftCollection.find({
    //     email: req.params.email,
    //   }).toArray();
    //   res.send(result);
    // });
    app.get('/craft/:email', async (req, res) => {
      const result = await AddCraftCollection.find({
        email: req.params.email,
      }).toArray();
      res.send(result);
    });
    app.get('/subcategory/:subcategory_Name', async (req, res) => {
      console.log(req.params.subcategory_Name);
      const result = await AddCraftCollection.find({
        subcategory_Name: req.params.subcategory_Name,
      }).toArray();
      res.send(result);
    });

    app.get('/AddCraft/:id', async (req, res) => {
      const result = await AddCraftCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.get('/Single/:id', async (req, res) => {
      const result = await AddCraftCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.post('/AddCraft', async (req, res) => {
      const newCraft = req.body;
      console.log(newCraft);
      const result = await AddCraftCollection.insertOne(newCraft);
      res.send(result);
    });
    app.put('/updateCraft/:id', async (req, res) => {
      console.log(req.params.id);
      const query = { _id: new ObjectId(req.params.id) };
      const data = {
        $set: {
          image: req.body.image,
          Itemname: req.body.Itemname,
          subcategory_Name: req.body.subcategory_Name,
          description: req.body.description,
          price: req.body.price,
          rating: req.body.rating,
          customization: req.body.customization,
          processing_time: req.body.processing_time,
          stockStatus: req.body.stockStatus,
        },
      };
      const result = await AddCraftCollection.updateOne(query, data);
      console.log(result);
      res.send(result);
    });

    app.delete('/delete/:id', async (req, res) => {
      const result = await AddCraftCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      res.send(result);
    });

    // AddSubcategoryCollection;
    app.get('/Subcategory', async (req, res) => {
      const cursor = AddSubcategoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/category/:id', async (req, res) => {
      console.log(req.params.id);
      const result = await AddSubcategoryCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`add craft server is running on port: ${port}`);
});
