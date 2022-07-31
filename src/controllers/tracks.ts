import { Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";

import Request from "../types/Request";

// @route   POST /api/tracks/twitter
// @desc    Handle track submission for twitter
// @access  Private
const verifyTwitter = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  });
};

// @route   POST /api/tracks/blockchain
// @desc    Handle track submission for blockchain
// @access  Private
const getBlockchainScore = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {},
  });
};

export { verifyTwitter, getBlockchainScore };
