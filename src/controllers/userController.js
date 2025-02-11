const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exist" });
    }

    //Create New User

    const newUser = new User({
      email,
      name,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Someting Went Wrong ", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      if (isMatch) {
        const payload = {
          user: {
            id: user.id,
            email: user.email,
          },
        };
    
        jwt.sign(
          payload,
          'SANTOSH', // Replace with your secret
          { expiresIn: '1h' }, // Token expires in 1 hour
          (err, token) => {
            if (err) throw err;
            return res.status(200).json({...user._doc,token}); 
          }
        );
   
      } else {
        return res
          .status(400)
          .json({ message: "Password or Email is Incorrect" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "User Not Found", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user delted sucessfully !!!!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { registerUser, loginUser,deleteUser };
