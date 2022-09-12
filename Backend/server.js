const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/yt",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const router = require("./routes/user.js");
app.use(router);

app.listen(port, () => {
  console.log("Server is up and running");
});
