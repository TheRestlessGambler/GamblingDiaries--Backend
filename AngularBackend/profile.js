const express = require("express");
const router = express.Router();
const SignUpApp = require("./Signup-login/SignUp"); // Assuming you have a User model

router.put("/", async (req, res) => {
  try {
    const { oldUsername, username, email, phoneNumber, gender } = req.body;

    // Find the document based on the username
    const user = await SignUpApp.User.findOne({ username: oldUsername });
    console.log(oldUsername);

    if (user) {
      // Update the document with the new data
      user.username = username;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.gender = gender;

      // Save the updated document
      await user.save();
      
      res.status(201).json({user});
      
      console.log("Document updated successfully.");
      res.status(200).json({ message: "Document updated successfully" });
    } else {
      console.log("No document found for the specified username.");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
