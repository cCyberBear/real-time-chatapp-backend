const catchAsync = require("../middlewares/async");
const Conversation = require("../Models/Conversation");
const mongoose = require("mongoose");
const apiError = require("../utility/apiError");

exports.createConservation = catchAsync(async (req, res) => {
  const findFirst = await Conversation.find({
    members: [...req.body].sort(),
  });
  if (findFirst.length) {
    throw new apiError(500, "Duplicate conversation");
  }
  const newConversation = await Conversation.create({
    members: [...req.body].sort(),
  });
  const conversation = await Conversation.findById(
    newConversation._id
  ).populate("members", "-password");
  res.status(200).json(conversation);
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
