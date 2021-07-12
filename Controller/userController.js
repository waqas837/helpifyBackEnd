const User = require("../Model/userModel");
// const appErrors = require("../Utils/appErrors");
const jwt = require("jsonwebtoken");
//create a token
const genToken = (id) => {
  //while generating a token we use the return statement
  return jwt.sign({ id }, "secretkey", { expiresIn: "90d" });
};
exports.newuser = async (req, res) => {
  const data = req.body;
  try {
    if (data.password === data.cpassword) {
      const dataCheck = new User(data);
      await dataCheck.save();
      if (dataCheck) {
        const token = genToken(dataCheck._id);
        res.json({ email: dataCheck.email, userData: dataCheck, token });
      }
    } else {
      res.json({ passerr: "passerr" });
    }
  } catch (error) {
    console.log(`error during signup ${error}`);
    console.log(error);
    res.json(error);
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isExists = await User.findOne({ email, password });
    // console.log(isExists);
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      const token = genToken(isExists._id)
      res.json({
        success: "success",
        user: isExists._id,
        fulldata: isExists,
        token
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
// //find all the users
// exports.findAllUsers = (async (req, res, next) => {
//   //1.Incoming http request has token's data
//   const { id, iat, exp } = req.decoded;
//   console.log(req.decoded);
//   console.log(id, iat, exp);
//   const data = await User.findById({ _id: id });
//   if (!data) {
//     res.status(401).json({
//       status: "failed",
//       message:
//         "This token seems not to be beloinging to current user please login!",
//     });
//   } else if (data) {
//     res.json({ data });
//   }
//   //2. check that if user changed his password
//   if (User.ifUserChangedPassword(iat)) {
//     res.status(401).json({
//       status: "failed",
//       message: "User recently changed the password please login!",
//     });
//   }
//   next();
// });
// //admin only will remove the record
// exports.removeRecord = asyncCatch(async (req, res, next) => {
//   const data = await User.remove();
//   if (data) {
//     res.status(200).json({ status: "success", message: "Record Removed" });
//   }
// });
// //forgot password

// exports.forgotEmail = asyncCatch(async (req, res, next) => {
//   // 1.get email of user
//   const user = await User.findOne({ email: req.body.email }).select("email");
//   if (!user) {
//     res.status(404).json({
//       status: "fail",
//       message: "user not found on this email",
//     });
//   } else {
//     res.json({ user });
//   }
//   // // 2.generate the random
//   const resetToken = user.createPassResetToken();
//   //deactive the validation before the save
//   await user.save({ validateBeforeSave: false });
// });
// //2.send email to the user email
// //reset password
