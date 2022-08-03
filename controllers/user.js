import HttpStatusCodes from 'http-status-codes'
import UserModel from '../models/User'
import { ETHAuth } from '@0xsequence/ethauth'
import jwt from 'jsonwebtoken'

const expireTime = 7 * 24 * 60 * 60
// generate jwt token stored in cookie with the payload
function generateJWTToken(payload) {
  console.log(`signing payload: `)
  console.log(payload)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime })
}

// @route   POST /api/user
// @desc    Get user data ( used by dapps )
// @access  Restricted
const getUserApp = async (req, res, next) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

// @route   POST /api/@me
// @desc    Get logged in user data
// @access  Private
const getUser = async (req, res, next) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

// @route   POST /api/user/login
// @desc    Login/Signup to app
// @access  Public
const loginUser = async (req, res, next) => {
  const ethAuth = new ETHAuth()
  const proof = await ethAuth.decodeProof(req.body.proofString).catch((err) => {
    console.log(err)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: 'error',
      error: 'INVALID PROOF',
    })
  })
  console.log(proof)
  if (!proof) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      status: 'error',
      error: 'PROOF IS WRONG',
    })
  }

  console.log(await UserModel.countDocuments())

  /*
  let user: IUser
  user = await UserModel.findOne({ address: proof.address })
  if (!user) {
    user = await UserModel.create({ address: proof.address })
  }
  console.log(user)
  const token = generateJWTToken(user._id)
  */
  return res.status(HttpStatusCodes.OK).json({
    status: 'ok',
    data: {
      // token,
      //user,
    },
  })
}

export { getUserApp, getUser, loginUser }