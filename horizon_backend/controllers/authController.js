import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const register = async (req, res) => {
  const { first_name, last_name, email, password, phone_number, account_type } =
    req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "This email address is already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password: hashPassword,
      phone_number,
      account_type,
    });
    const result = await newUser.save();
    result._doc.password = undefined;

    return res.status(201).json({ success: true, ...result._doc });
  } catch (error) {
    console.log("Error creating user:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ error: `User under '${email}' not found` });
    }
    const match = await bcrypt.compare(password, userExists.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect password. Try Again" });
    }

    const token = jwt.sign(
      {
        email: userExists.email,
        account_type: userExists.account_type,
        id: userExists._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "59m" }
    );

    const user = { ...userExists._doc, password: undefined };
    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.log("Error authenticating user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const passwordChange = async (req, res) => {
  const { newPassword, email } = req.body;

  try {
    const hashPassword = await bcrypt.hash(newPassword, 12);
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password: hashPassword } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ error: ` User under ${email} not found` });
    }
    res
      .status(201)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log("Error changing password:", user);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { register, login, passwordChange };
