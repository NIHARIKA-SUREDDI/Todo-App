const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskroutes");

const app = express();


app.get('/',(req,res)=>{
    res.send("this is test route");
})
// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`));
