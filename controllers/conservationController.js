const catchAsync = require("../middlewares/async");
const Conversation = require("../Models/Conversation");
const mongoose = require("mongoose");

exports.createConservation = catchAsync(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  const savedConversation = await newConversation.save();
  res.status(200).json(savedConversation);
});

exports.getConservationOfUser = catchAsync(async (req, res) => {
  const conversation = await Conversation.find({
    members: { $in: [mongoose.Types.ObjectId(req.params.userId)] },
  }).populate("members", "-password");
  res.status(200).json(conversation);
});

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//     try {
//       const conversation = await Conversation.findOne({
//         members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//       });
//       res.status(200).json(conversation);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
