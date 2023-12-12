//this file is for exporting Object id for any use


const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

// Connection URL
const url = "mongodb+srv://abhinavratan007:xyp9x%40123@cluster0.loyyvey.mongodb.net/AngularDatabase";

// Database Name
const dbName = 'AngularDatabase';

// Collection Name
const collectionName = 'users'; // Assuming the collection is named 'users'

// Specify the username for which you want to retrieve the Object ID
const usernameToFind = 'poi';

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB server');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Find the document based on the username
  collection.findOne({ username: usernameToFind }, (findErr, result) => {
    if (findErr) {
      console.error('Error finding document:', findErr);
    } else if (result) {
      console.log('Object ID:', result._id); // Output: Object ID: 5f7a68d7c442c12c9c8e6f1f
    } else {
      console.log('No document found for the specified username.');
    }

    // Close the MongoDB connection
    client.close();
  });
});
