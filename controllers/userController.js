import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, message: `No user with the id: ${id}` });
    res.status(200).json({ success: true, data: findUser });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, password, confirmPassword } = req.body;
    const encryptPassword = await bcrypt.hash(password, 12);
    const signupObj = {
      username: username,
      email: email,
      password: encryptPassword,
      confirmPassword: encryptPassword,
    };
    const user = await User.create(signupObj);
    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    // console.log(findUser);
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, message: `No user with the email: ${email}` });
    const comparePasswords = await bcrypt.compare(password, findUser.password);
    // console.log(comparePasswords);
    if (!comparePasswords)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign(
      { email: findUser.email, id: findUser._id },
      SECRET,
      { expiresIn: "1hr" }
    );
    res
      .status(200)
      .json({ success: true, message: "Logged in successfull", token: token });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const updateUserById = async (req, res) => {
  try {
    // data and id
    // id => req.params
    // data => req.body
    const { id } = req.params;
    const encryptPassword = await bcrypt.hash(req.body.password, 12);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
        password: encryptPassword,
        confirmPassword: encryptPassword,
      },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    // id => req.params
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: `No user with the id: ${id}` });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
