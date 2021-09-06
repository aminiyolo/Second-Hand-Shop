const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/product");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

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
  console.log(req.body.id);
  try {
    await Product.findByIdAndDelete({ _id: req.body.id });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
