const express = require('express') ;
const cors = require('cors') ;
const app = express();
const port = 5000 ;
app.use(cors()) ;
app.use(express.json()) ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');




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
    const userDB = client.db("userDB");
    const userCollection = userDB.collection("userCollection") ;

//=====  product routes =======

// send data
app.post('/blogs', async(req, res) => {
    const blogsData = req.body ;
    const result = await blogsCollection.insertOne(blogsData);
    res.send(result);
}) ;

// get data
app.get('/blogs', async(req, res) => {
    const blogsData =  blogsCollection.find();
    const result = await blogsData.toArray() ;
    res.send(result);
})


// get single data
app.get('/blogs/:id', async(req, res) => {
    const id = req.params.id
    const blogsData =  await blogsCollection.findOne({_id: new ObjectId(id)});
    res.send(blogsData);
})


// update
app.patch('/blogs/:id', async(req, res) => {
    const id = req.params.id
    const updatedData = req.body ;

    const result =  await blogsCollection.updateOne(
      { _id: new ObjectId(id) },  
      { $set:updatedData  }  
      
    );
    res.send(result);
})

// delete
app.delete('/blogs/:id', async(req, res) => {
    const id = req.params.id
    const result =  await blogsCollection.deleteOne(
      { _id: new ObjectId(id) },  
    );
    res.send(result);
})


// ========= user routes =========

// add user
app.post('/user', async(req, res) => {
  const user = req.body ;
  const isUserExist = await userCollection.findOne({ email: user?.email }) ;
  if (isUserExist?._id){
    return res.send ({
      status: "success",
      message: "Login Success",
    });
  }
  const result = await userCollection.insertOne(user);
  res.send(result);
}) ;


// get user
app.get('/user/:email', async(req, res) => {
  const email = req.params.email
  const result =  await userCollection.findOne({ email });
  res.send(result);
})


// update user
app.patch('/user/:email', async(req, res) => {
  const email = req.params.email ;
  const userData = req.body ;
  const result =  await userCollection.updateOne(
    { email },
    {$set : userData},
    { upsert: true });
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

