import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//Send list of products to frontend
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//Create sample products
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

export default productRouter;
