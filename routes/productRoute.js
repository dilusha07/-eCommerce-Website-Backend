import express from "express";
import Product from "../models/productModel";

const router = express.Router();

//Get List of Products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//Create new Product
router.post("/", async (req, res) => {
  const product = new Product({
    sku: req.body.sku,
    image: req.body.image,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: "Error in Creating Product." });
});

export default router;
