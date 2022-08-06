import HttpStatusCodes from "http-status-codes";
import blockchainScore from "./blockchain/index.js";
import UserModel from "../models/User.js";

// @route   POST /api/tracks/twitter
// @desc    Handle track submission for twitter
// @access  Private
const verifyTwitter = async (req, res) => {
  return res.status(HttpStatusCodes.OK).json({
    status: "ok",
    data: {},
  });
};

// @route   POST /api/tracks/blockchain
// @desc    Handle track submission for blockchain
// @access  Private
const getBlockchainScore = async (req, res) => {
  const user = await UserModel.findById(req.user);
  console.log(user);
  const score = await blockchainScore(user.address);
  console.log("score:", score);
  // update score for user
  user.creditScore += score;
  user.tracksCompleted.push({
    name: "blockchain",
    completedOn: new Date().toISOString(),
    score,
  });
  // user.availableTracks = user.availableTracks.filter((item) => item.name !== "blockchain");
  user.availableTracks.splice(
    user.availableTracks.findIndex((item) => item.name === "blockchain"),
    1
  );

  // save user and return data
  await user.save().catch((err) => {
    console.log(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      error: err.errors.message,
    });
  });
  console.log(user);
  return res.status(HttpStatusCodes.OK).json({
    status: "ok",
    data: {
      score,
      user,
    },
  });
};

// @route   POST /api/tracks/captcha
// @desc    Handle track submission for captcha
// @access  Private
const handleCaptcha = async (req, res) => {
  // get data from frontend, add score to user

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  });
};

export { verifyTwitter, getBlockchainScore, handleCaptcha };
