const catchAsync = require("../middlewares/async");
const Message = require("../Models/Message");

exports.sendMessage = catchAsync(async (req, res) => {
  const newMessage = new Message(req.body);
  const savedMessage = await newMessage.save();
  res.status(200).json(savedMessage);
});
exports.getMessage = catchAsync(async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  });
  res.status(200).json(messages);
});
