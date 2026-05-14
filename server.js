const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGO_URI;

const express = require("express")

const app = express()

app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }    finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
   }
}

async function startServer() {
    try {
        await connectDB()
        app.listen(3000, () => {
            console.log("Server running on port 3000")
        })
    }   catch (error) {
        console.log("Failed to connect.", error)
    }
}

startServer();

app.use((req, res, next) => {
    res.set(`Access-Control-Allow-Origin`, `*`)

    if (req.method === `OPTIONS`) {
        res.set(`Access-Control-Allow-Methods`, `POST,PATCH,DELETE`)
        res.set(`Access-Control-Allow-Headers`, `Content-Type`)
        return res.sendStatus(204)
    }

    next()
})

const db = client.db("microblog");

const postsCollection = db.collection("posts");

app.post("/posts", async (req,res) => {
    const post = {
        body: req.body.body,
        author: req.body.author,
        createdAt: new Date()
    }
    const result = await postsCollection.insertOne(post);
    console.log(result);
    res.send("received")
})

app.get("/posts", async (req, res) => {
  const posts = await postsCollection.find().toArray();
  console.log("posts found:", posts);
  res.json(posts);
});

app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const result = await postsCollection.deleteOne({
        _id: objectId
    });

    console.log(result);
    res.json(result);
});