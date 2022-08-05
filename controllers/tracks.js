import HttpStatusCodes from "http-status-codes";
import blockchainScore from "./blockchain/index.js";

// @route   POST /api/tracks/twitter
// @desc    Handle track submission for twitter
// @access  Private
const verifyTwitter = async (req, res) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  });
};

// @route   POST /api/tracks/blockchain
// @desc    Handle track submission for blockchain
// @access  Private
const getBlockchainScore = async (req, res) => {
  const { address } = req.body;
  const score = await blockchainScore(address);
  console.log("score:" ,score);
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: { score },
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
