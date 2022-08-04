import HttpStatusCodes from 'http-status-codes'

// @route   POST /api/tracks/twitter
// @desc    Handle track submission for twitter
// @access  Private
const verifyTwitter = async (req, res, next) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

// @route   POST /api/tracks/blockchain
// @desc    Handle track submission for blockchain
// @access  Private
const getBlockchainScore = async (req, res, next) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

// @route   POST /api/tracks/captcha
// @desc    Handle track submission for captcha
// @access  Private
const handleCaptcha = async (req, res, next) => {
  // get data from frontend, add score to user

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

export { verifyTwitter, getBlockchainScore, handleCaptcha }
