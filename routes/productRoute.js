import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

//Get List of Products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//Get a product
router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

//Create new Product
router.post("/", isAuth, isAdmin, async (req, res) => {
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

//Edit Product
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.sku = req.body.sku;
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: " Error in Updating Product." });
});

//Delete Product
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

export default productRoute;
