import express from "express";
import mongoose from "mongoose";
import SongRouter from "./routes/SongRouter.js";
import UserRouter from "./routes/UserRouter.js";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
const app = express();


app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

//routes
app.use("/api/song",SongRouter);
app.use("/api/user", UserRouter);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port 3000");
  });
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});