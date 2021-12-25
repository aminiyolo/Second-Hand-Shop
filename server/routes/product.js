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

router.get("/data", async (req, res) => {
  const cursor = req.query.cursor || "";
  try {
    const products = await Product.find().populate("seller");
    const fromIndex =
      products.reverse().findIndex((product) => product.id === cursor) + 1;
    return res.status(200).json(products.slice(fromIndex, fromIndex + 4));
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/data", async (req, res) => {
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
      return res.status(200).json(products.reverse());
    } else {
      if (!Object.keys(filter).length) {
        const products = await Product.find(filter).populate("seller");
        return res.status(200).json(products.reverse().splice(0, 4));
      }
      const products = await Product.find(filter).populate("seller");
      return res.status(200).json(products.reverse());
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
