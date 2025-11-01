
const { default: e } = require('cors');
require('dotenv').config();
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

console.log("DB User: "+db_user);


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://"+db_user+":"+db_pass+"@workouttrackerserver1.xzkgao0.mongodb.net/?appName=workoutTrackerServer1";
console.log("Mongo URI: "+uri);
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
        console.log("Connection to MongoDB closed.");

  }
}

async function insertWorkout(workout) {
  try {
    await client.connect();
    const database = client.db('workoutTrackerDB');
    const workouts = database.collection('workouts');
    const result = await workouts.insertOne(workout);
    console.log(`New workout inserted with the following id: ${result.insertedId}`);
  } finally {
    await client.close();
    console.log("Connection to MongoDB closed.");
  }
}

 module.exports = { insertWorkout };


run().catch(console.dir);
temp = {name: 'bench', repetitions: '10', weight: '100', duration: '120', id: 1761970237700};

//insertWorkout(temp).catch(console.dir);
/*
0: {name: 'bench', repetitions: '10', weight: '100', duration: '120', id: 1761970237700}
1: {name: 'shoulder press', repetitions: '10', weight: '140', duration: '120', id: 1761970254112}


*/