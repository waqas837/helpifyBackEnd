const mongoose = require("mongoose");
const validator = require("validator");
// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  selectedFile: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("emailWrongPattern");
    },
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
  },
  // role: {
  //   type: String,
  //   //enum is type of validator that checks the values like in this array
  //   enum: ["user", "lead", "admin"],
  //   default: "user",
  // },
  password: String,
  cpassword: {
    type: String,
    required: [true, "Please put confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  // passChangedAt: Date,
  // passwordResetToken: Date,
  // passwordRsetExpires: Date,
});
// //middlewares
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   //this.field = bcrypt.hash(this.field)
//   //as bcrypt.hash is async so if we don't use the
//   //then queue processes remains in the event loop
//   //then event loop will be blocked/break and we don't want that...,
//   this.password = await bcrypt.hash(this.password, 12);
//   this.cpassword = undefined; //when we set any field undefined it is deleted
// });

// //compare the bcrypted password by method calling
// //these methods will make a new object method on this schema
// userSchema.methods.verifyPassword = async function (bodypass, dbpass) {
//   return await bcrypt.compare(bodypass, dbpass); //it will retrun true/false
// };

// //check if user changed his password
// userSchema.methods.ifUserChangedPassword = function (JWTTimeStamps) {
//   if (this.passChangedAt) {
//     const changeStamp = parseInt(this.passChangedAt.getTime() / 10, 10);
//     return JWTTimeStamps < changeStamp;
//   } else {
//     return false;
//   }
// };
// //password reset functionality
// userSchema.methods.createPassResetToken = function () {
//   const resetPas = crypto.randomBytes(32).toString("hex"); //create a randowm string
//    this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetPas)
//     .digest("hex"); //hash the random string
//   //give it expiry time
//   console.log({ resetPas }, this.passwordResetToken);
//   this.passwordRsetExpires = Date.now() + 10 * 60 * 1000; //10 mins expires,in ms to converted
//   return resetPas;
// };
module.exports = mongoose.model("User", userSchema);
