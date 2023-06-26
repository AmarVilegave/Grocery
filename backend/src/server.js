const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const app = express();
const categories = require("./routes/categoryRoute");
const products = require("./routes/productRoute");
const cors = require("cors");


mongoose
  .connect("mongodb://127.0.0.1:27017/grocery-shopping")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB : " + err));

app.use(express.json());
app.use(cors());
app.use("/api/categories", categories);


const port = 8088;

app.listen(port, () => console.log("Connected to port:" + port));