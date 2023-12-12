// models/journal.js
const express = require("express");
const router = express.Router();
const User = require("./Signup-login/SignUp");
const objId = require("./findUserId");
const app = express();

const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  entry: String,
  date: { type: Date, default: Date.now },
  time: String,
  symbol: String,
  pnl: Number,
  observation: String,
});

const Journal = mongoose.model("Journal", journalSchema);

// Updated route for fetching journal entries based on userId
app.get("/journal-entries", async (req, res) => {
  console.log("apple orange");
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch journal entries for the specified user ID
    const entries = await Journal.find({ userId });

    res.json(entries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { entry, date, time, symbol, pnl, observation } = req.body;

    // Find the user
    const user = await User.User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new journal entry
    const newEntry = new Journal({
      userId,
      entry,
      date,
      time,
      symbol,
      pnl,
      observation,
    });
    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
