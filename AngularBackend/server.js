const express = require("express");
const mongoose = require("mongoose");
const SignUpRouter = require("./Signup-login/SignUp");
const LoginRouter = require("./Signup-login/Login");
const profileRouter = require("./profile");
const journalRouter = require("./Journals");
const findUserRouter = require("./findUserId");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

// Use the SignUp and Login apps as middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/signup", SignUpRouter.router);
app.use("/login", LoginRouter);
app.use("/update", profileRouter);
app.use("/journal", journalRouter);
app.use("/findUser", findUserRouter);


// Start the server
app.listen(PORT, () => {
  mongoose.connect(
    "mongodb+srv://abhinavratan007:xyp9x%40123@cluster0.loyyvey.mongodb.net/AngularDatabase"
  );
  console.log(`Server is running on port ${PORT}`);
});
