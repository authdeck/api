import { Router, Response, NextFunction } from 'express'
import HttpStatusCodes from 'http-status-codes'

import Request from '../types/Request'
import User, { IUser } from '../models/User'

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
// @desc    Login to app
// @access  Private
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  })
}

export { getUserApp, getUser, loginUser }
