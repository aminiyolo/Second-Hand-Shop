const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation");

// check if thers is a conversation or not
router.post("/check", async (req, res) => {
  try {
    const existedConversation = await Conversation.find({
      members: { $all: [req.body.senderId, req.body.receiverId] },
      productId: req.body.productId,
    });
    res.status(200).json(existedConversation);
  } catch (err) {
    console.log(err);
  }
});

// new conversation

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    title: req.body.title,
    productId: req.body.productId,
    image: req.body.image,
    price: req.body.price,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
