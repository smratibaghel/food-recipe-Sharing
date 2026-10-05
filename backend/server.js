import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js"
import cors from 'cors'

const app = express();

app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))
// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", userRouter);
app.use("/api",recipeRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "recipe"
})
.then(() => console.log("mongodb connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});




//username= aashitaasati21_db_user

//password= WZebUSetA4XDVxRb

//mongodb+srv://aashitaasati21_db_user:<db_password>@cluster0.dixofy4.mongodb.net/