import { Router, Response, NextFunction } from 'express'
import HttpStatusCodes from 'http-status-codes'

import Request from '../types/Request'
import User, { IUser } from '../models/User'
import { ETHAuth, Proof } from '@0xsequence/ethauth'
import jwt from 'jsonwebtoken'

const expireTime = 7 * 24 * 60 * 60
// generate jwt token stored in cookie with the payload
function generateJWTToken(payload: string) {
  console.log(`signing payload: `)
  console.log(payload)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime })
}

// @route   POST /api/user
// @desc    Get user data ( used by dapps )
// @access  Restricted
const getUserApp = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

// @route   POST /api/@me
// @desc    Get logged in user data
// @access  Private
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

// @route   POST /api/user/login
// @desc    Login/Signup to app
// @access  Public
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const ethAuth = new ETHAuth()
  const proof: Proof | any = await ethAuth
    .decodeProof(req.body.proofString)
    .catch((err) => {
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

  let user: IUser
  user = await User.findOne({ address: proof.address })
  if (!user) {
    user = await User.create({ address: proof.address })
  }

  const token = generateJWTToken(user._id)
  return res.status(HttpStatusCodes.OK).json({
    status: "ok",
    data: {
      token,
      user,
    }
  })
}

export { getUserApp, getUser, loginUser }
