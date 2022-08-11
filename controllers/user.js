import HttpStatusCodes from "http-status-codes";
import UserModel from "../models/User.js";
import { ETHAuth } from "@0xsequence/ethauth";
import jwt from "jsonwebtoken";

const expireTime = 7 * 24 * 60 * 60;
// generate jwt token stored in cookie with the payload
function generateJWTToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime });
}

// @route   POST /api/user
// @desc    Get user data ( used by dapps )
// @access  Restricted
const getUserApp = async (req, res) => {
  const { address } = req.body;
  console.log(address);
  const user = await UserModel.findOne({
    address: address,
  });
  console.log(user);
  if (!user) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "User not found",
    });
  } else {
    return res.status(HttpStatusCodes.OK).json({
      status: "ok",
      data: JSON.parse(JSON.stringify(user)),
    });
  }
};

// @route   POST /api/user/@me
// @desc    Get logged in user data
// @access  Private
const getUser = async (req, res) => {
  const user = await UserModel.findById(req.user);
  if (!user) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "USER NOT FOUND",
    });
  } else {
    return res.status(HttpStatusCodes.OK).json({
      status: "ok",
      data: JSON.parse(JSON.stringify(user)),
    });
  }
};

// @route   POST /api/user/login
// @desc    Login/Signup to app
// @access  Public
const loginUser = async (req, res) => {
  const ethAuth = new ETHAuth();
  const proof = await ethAuth.decodeProof(req.body.proofString).catch((err) => {
    console.log(err);
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "INVALID PROOF",
    });
  });
  console.log("proof", proof);
  if (!proof) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "PROOF IS WRONG",
    });
  }

  let user;
  const isUser = await UserModel.exists({ address: proof.address });
  console.log("isUser", isUser);
  if (!isUser) {
    user = await UserModel.create({ address: proof.address });
  } else {
    user = await UserModel.findOne({ address: proof.address });
  }
  const token = generateJWTToken({ id: user._id });
  console.log("token", token);
  return res.status(HttpStatusCodes.OK).json({
    status: "ok",
    data: {
      token,
      user,
    },
  });
};

export { getUserApp, getUser, loginUser };
