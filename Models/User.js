const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already existed"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Must be at least 6 characters"],
      maxlength: [30, "Must be less than 30 characters"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
  next();
});

mongoose.set("runValidators", true);

const user = mongoose.model("User", UserSchema);

module.exports = user;
