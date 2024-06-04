const express = require('express') ;
const cors = require('cors') ;
const app = express();
const port = 5000 ;
app.use(cors()) ;
app.use(express.json()) ;
const { MongoClient, ServerApiVersion } = require('mongodb');




const uri = "mongodb+srv://khayrulalamdict:AdrN0sAmVR43ne6K@cluster0.qdsaagu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const blogDB = client.db("blogDB");
    const blogsCollection = blogDB.collection("blogsCollection");

// product routes
app.post('/blogs', async(req, res) => {

    const blogsData = req.body ;
    const result = await blogsCollection.insertOne(blogsData);
    res.send(result);
})

    console.log("Database is connected");
  } finally {
    
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// khayrulalamdict
// AdrN0sAmVR43ne6K