import helmet from "helmet";
import cors from 'cors'
import 'express-async-errors'; 
import { errorHandler } from "./middleware/error.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {authRouter} from "./routers/index.js"
import express from 'express'

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


// Load the routers
app.use("/auth", authRouter)
// Global error handler
app.use(errorHandler)
// Start the server
app.listen(PORT, () => {
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/dev",
    
  );
  console.log(`Server is running on port ${PORT}`);
});
