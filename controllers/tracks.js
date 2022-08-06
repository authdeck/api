import HttpStatusCodes from "http-status-codes";
import blockchainScore from "./blockchain/index.js";
import UserModel from "../models/User.js";
import axios from "axios";
import { ETHAuth } from "@0xsequence/ethauth";

// @route   POST /api/tracks/twitter
// @desc    Handle track submission for twitter
// @access  Private
const verifyTwitter = async (req, res) => {
  // req.body = link to tweet
  // fetch proofString from there
  // decode proofString
  // match address from decoded proofString and user address from jwt
  // update score, and return

  const user = await UserModel.findById(req.user);
  const { tweet, proofString } = req.body;
  const ethAuth = new ETHAuth();
  const proof = await ethAuth.decodeProof(proofString).catch((err) => {
    console.log(err);
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "INVALID PROOF",
    });
  });

  console.log(proof.signature);
  const url = `https://publish.twitter.com/oembed?url=${tweet}`;
  const tweetbody = await axios.get(url);
  const html = tweetbody.data.html;
  const signature = html.match(/0x.{130}/);
  if (!signature) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "tweet doesn't have signature",
    });
  }
  if (signature[0] !== proof.signature) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "signature doesnt match, try again",
    });
  }

  // check if twitter exists in tracksCompleted, if yes, then remove from array and reduce credit score, then update
  const track = user.tracksCompleted.filter((e) => e.name === "twitter");
  if (track.length > 0) {
    user.tracksCompleted = user.tracksCompleted.filter(
      (e) => e.name !== "twitter"
    );
    user.creditScore -= 20;
  }
  user.tracksCompleted.push({
    name: "twitter",
    completedOn: new Date().toDateString(),
    score: 10,
  });
  user.creditScore += 20;
  if (track.length < 0) {
    user.availableTracks.splice(
      user.availableTracks.findIndex((item) => item.name === "twitter"),
      1
    );
  }

  // save user and return data
  await user.save().catch((err) => {
    console.log(err);
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "error saving user",
    });
  });
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {
      status: "ok",
      data: { user },
    },
  });
};

// @route   POST /api/tracks/blockchain
// @desc    Handle track submission for blockchain
// @access  Private
const getBlockchainScore = async (req, res) => {
  const user = await UserModel.findById(req.user);
  console.log(user);
  const score = Math.round(await blockchainScore(user.address));
  console.log("score:", score);
  // update score for user

  // check if blockchain exists in tracksCompleted, if yes, then remove from array and reduce credit score, then update
  const track = user.tracksCompleted.filter((e) => e.name === "blockchain");
  if (track.length > 0) {
    user.creditScore -= track[0].score;
    user.tracksCompleted.splice(user.tracksCompleted.indexOf(track[0]), 1);
  }

  user.creditScore += Math.round(score);
  user.tracksCompleted.push({
    name: "blockchain",
    completedOn: new Date().toDateString(),
    score,
  });
  // user.availableTracks = user.availableTracks.filter((item) => item.name !== "blockchain");
  if (track.length <= 0) {
    user.availableTracks.splice(
      user.availableTracks.findIndex((item) => item.name === "blockchain"),
      1
    );
  }

  // save user and return data
  await user.save().catch((err) => {
    console.log(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      error: err,
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

const getBlockchain = async (req, res) => {
  const score = Math.round(await blockchainScore(req.body.address));
  console.log("score:", score);
  res.json({ score });
};

// @route   POST /api/tracks/captcha
// @desc    Handle track submission for captcha
// @access  Private
const handleCaptcha = async (req, res) => {
  const { token, ekey } = req.body;
  // i have no idea what to do with this
  console.log(token, ekey);
  const user = await UserModel.findById(req.user);

  // check if captcha exists in tracksCompleted, if yes, then remove from array and reduce credit score, then update
  const track = user.tracksCompleted.filter((e) => e.name === "captcha");
  if (track.length > 0) {
    user.tracksCompleted = user.tracksCompleted.filter(
      (e) => e.name !== "captcha"
    );
    user.creditScore -= 10;
  }
  user.tracksCompleted.push({
    name: "captcha",
    completedOn: new Date().toDateString(),
    score: 10,
  });
  user.creditScore += 10;
  if (track.length < 0) {
    user.availableTracks.splice(
      user.availableTracks.findIndex((item) => item.name === "captcha"),
      1
    );
  }

  // save user and return data
  await user.save().catch((err) => {
    console.log(err);
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: "error",
      error: "error saving user",
    });
  });

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {
      status: "ok",
      data: { user },
    },
  });
};

export { verifyTwitter, getBlockchainScore, handleCaptcha, getBlockchain };
