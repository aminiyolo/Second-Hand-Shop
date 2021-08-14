const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res
        .status(200)
        .json({ success: false, msg: "이미 가입된 이메일입니다." });
    }

    const nickname = await User.findOne({ nickname: req.body.nickname });
    if (nickname) {
      return res
        .status(200)
        .json({ success: false, msg: "이미 존재하는 닉네임입니다." });
    }

    const ID = await User.findOne({ ID: req.body.ID });
    if (ID) {
      return res
        .status(200)
        .json({ success: false, msg: "이미 존재하는 아이디입니다." });
    }

    const user = new User(req.body);

    const saved = await user.save();
    if (saved) return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

router.post("/login", (req, res) => {
  // Look for a requested ID in a database
  User.findOne({ ID: req.body.ID }, (err, user) => {
    if (!user) {
      return res.json({ success: false, msg: "Doesn't Exist USER" });
    }
    // If there is a data that we look for, Check the password if corrected
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.json({ success: false, msg: err });
      }
      if (isMatch === false) {
        return res.json({ success: false, msg: "password is incorrect" });
      }
      // If the password is correct, Give a token
      user.giveToken((err, user) => {
        if (err) {
          return res.json({ success: false });
        }
        res
          .cookie("USER", user.token)
          .status(200)
          .json({ success: true, userId: user._id });
      });
    });
  });
});

router.get("/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success });
  }
});

router.get("/data", auth, (req, res) => {
  return res.json(req.user);
});

router.post("/addTo_cart", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            id: req.body.id,
          },
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/removeFrom_cart", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: {
          cart: {
            id: req.body.id,
          },
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post("/count_added_product", async (req, res) => {
  const id = req.body.id;
  try {
    const info = await User.find({ cart: { id } });
    res.status(200).json({ length: info.length });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find", async (req, res) => {
  const userId = req.query.userId;
  const userName = req.query.userName;

  try {
    const user = userId
      ? await User.findById(userId)
      : User.findOne({ nickname: userName });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const ALL = await User.find();
    res.status(200).json(ALL);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
