import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import productRoute from "./routes/productRoute.js";

const app = express();

const port = process.env.PORT || 5000;

//Connect MongoDB cloud database
const databaseURL =
  "mongodb+srv://dilusha07:d1234s123@cluster0.65hdtzy.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Server is ready...");
});

//Catch errors
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
