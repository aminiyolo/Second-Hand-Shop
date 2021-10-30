const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

router.post("/upload", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/data", async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let searchValue = req.body.searchValue;
  let filter = {};

  if (req.body.category && req.body.category.length > 0) {
    filter = {
      category: req.body.category,
    };
  }

  try {
    if (searchValue) {
      const products = await Product.find(filter)
        .find({ $text: { $search: searchValue } })
        .populate("seller");
      return res.status(200).json({
        products: products.reverse().splice(skip, limit),
        length: products.length,
      });
    } else {
      const products = await Product.find(filter).populate("seller");
      return res.status(200).json({
        products: products.reverse().splice(skip, limit),
        length: products.length,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/product_by_id", async (req, res) => {
  let ID = req.query.id;
  let type = req.query.type;

  if (type === "array") {
    let ids = req.query.id.split(",");
    ID = ids.map((id) => {
      return id;
    });
  }

  try {
    const productInfo = await Product.find({ _id: { $in: ID } })
      .populate("seller")
      .exec();
    res.status(200).json({ productInfo });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/myProduct", async (req, res) => {
  try {
    const productInfo = await Product.find({ seller: req.body.id });
    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/remove_from_myPage", async (req, res) => {
  try {
    await Product.findByIdAndDelete({ _id: req.body.id });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/edit", async (req, res) => {
  try {
    await Product.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          period: req.body.period,
          price: req.body.price,
          images: req.body.images,
        },
      }
    );
    return res.status(200).json();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
