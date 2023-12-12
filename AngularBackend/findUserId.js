const express = require("express");
const User = require('./Signup-login/SignUp');
const router = express.Router(); // Import your Mongoose model

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userId = await getObjectIdString(username);
    res.json({ userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

async function getObjectIdString(username) {
  try {
    // Find a document in your collection
    const document = await User.User.findOne({ username });

    if (document) {
      // Access the _id field and convert it to a string
      const objectIdString = document._id.toString();
      console.log('Object ID String:', objectIdString);
      return objectIdString; // Return the value
    } else {
      console.log('Document not found.');
      return null; // or throw an error, depending on your requirements
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error for proper error handling
  }
}

module.exports = router;
