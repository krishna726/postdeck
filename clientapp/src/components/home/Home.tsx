import React from 'react'

export const Home = () => {

    const { MongoClient } = require("mongodb");
    // Replace the uri string with your MongoDB deployment's connection string.
    const uri =
    "mongodb+srv://root:postdeckDB@post-deck.prbu0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    async function run() {
        try {
          await client.connect();
      
          const database = client.db('postdeck-data');
          const users = database.collection('users');
      
          // Query for a movie that has the title 'Back to the Future'
          const query = { email: 'krishnaraj1434+1@gmail.com' };
          const user = await users.findOne(query);
      
          console.log(user);
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }

    return (
        <div>
            <h1>Home</h1>
            {run().catch(console.dir)}

        </div>
    )
}





