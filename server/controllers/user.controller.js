const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");
require("dotenv").config();

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({ msg: "Required details not provided" });
    }
    const findUser = await User.find({ email });

    if (findUser.length > 0) {
      return res.status(400).send({
        msg: "An User already exists with this Email-ID.",
      });
    }

    let newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    return res
      .status(200)
      .send({ msg: "User registration successful.", newUser });
  } catch (error) {
    return res.status(400).send({ msg: "Error Occurs", error });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      // Check if the provided password matches the stored password
      const passwordMatch = password === findUser.password;

      if (passwordMatch) {
        const token = jwt.sign({ id: findUser.id }, process.env.SECRET_KEY);
        return res.status(200).send({ msg: "Login Successful", token });
      } else {
        return res.status(400).send({ msg: "Wrong Password" });
      }
    } else {
      return res.status(400).send({ msg: "No user registered with this Email-ID." });
    }
  } catch (error) {
    return res.status(400).send({ msg: "Error occurred while processing your request" });
  }
});

const allUser = asyncHandler(async (req, res) => {
  try {
    // if (req.user.role === "Admin") {
    const allUsers = await User.find();
    return res.status(200).send({ msg: "Success", allUsers });
    // } else {
    //   return res.status(401).send({ msg: "Not authorized!" });
    // }
  } catch (error) {
    return res.status(400).send({ msg: "Catch Block", error });
  }
});

// const userProfile = asyncHandler(async (req, res) => {
//   try {
//     return res.status(200).send({ msg: "Success", user: req.user });
//   } catch (error) {
//     return res.status(400).send({ msg: "Catch Block", error });
//   }
// });

const editUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { email, oldPass, newPass } = req.body;
    if (oldPass && newPass && email && oldPass !== newPass) {
      let updateData = {
        email,
        password: newPass,
      };
      const userToResetPass = await User.findById(id);
      if (oldPass === userToResetPass.password) {
        let updatedUser = await User.findByIdAndUpdate(id, { updateData });
        return res
          .status(200)
          .send({ msg: "User updated successfully.", updatedUser });
      } else {
        return res.status(400).send({ msg: "Wrong Password" });
      }
    } else if (oldPass && newPass && oldPass !== newPass) {
      const userToResetPass = await User.findById(id);
      if (oldPass === userToResetPass.password) {
        let updatedUser = await User.findByIdAndUpdate(
          id,
          {
            password: newPass,
          },
          { new: true }
        );
        return res
          .status(200)
          .send({ msg: "Password updated successfully.", updatedUser });
      } else {
        return res.status(400).send({ msg: "Wrong Password" });
      }
    } else if (email) {
      let updatedUser = await User.findByIdAndUpdate(id, { email });
      return res
        .status(200)
        .send({ msg: "Email updated successfully.", updatedUser });
    }
  } catch (error) {
    return res.status(400).send({ msg: "Catch Block", error });
  }
});

const deleteUserAccount = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    return res.status(200).send({ msg: "Successffully Deleted", deleteUser });
  } catch (error) {
    return res.status(400).send({ msg: "Catch Block", error: error.message });
  }
});

// const getUser = asyncHandler(async (req,res)=>{
//   try{
//     const token = req.headers.authorization?.split(' ')[1];
//     if(!token){
//       return res.status(400).send({msg : "User Not Found"})
//     }

//     const secretkey = process.env.SECRET_KEY || "default";
//     console.log("Token:", token); // Log token for debugging
//     const decodedToken = jwt.verify(token , secretkey)
//     console.log("Decoded Token:", decodedToken);
//     console.log("done")
//     const userid = decodedToken.id;
//     if(!userid){
//       return res.status(400).send({msg :"User Id required"})
//     }
//     console.log(userid)

//     const data = await User.findOne(userid)
//     return res.status(200).send({msg : "User Found" , data})
//   }
//   catch(error){
//     return res.status(400).send({msg : "Error Found"})
//   }
// })

const getUser = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).send({ msg: "User Not Found" });
    }

    const secretkey = process.env.SECRET_KEY || "default";
    console.log("Token:", token);
    const decodedToken = jwt.verify(token, secretkey);
    console.log("Decoded Token:", decodedToken);
    const userId = decodedToken.id;
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(400).send({ msg: "User Id required" });
    }

    const data = await User.find({ _id: userId });
    if (!data) {
      return res.status(400).send({ msg: "User not found" });
    }
    console.log(data)

    return res.status(200).send({ msg: "User Found", data });
   
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    return res.status(400).send({ msg: "Error Found", error: error.message });
  }
});

module.exports = {
  addUser,
  getUser,
  allUser,
  editUser,
  deleteUserAccount,
  loginUser,
};
