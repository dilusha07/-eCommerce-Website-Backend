import express from "express";
import Product from "../models/productModel";

const router = express.Router();

//Get List of Products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

export default router;
