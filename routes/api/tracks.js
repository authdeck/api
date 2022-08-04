import { Router } from 'express'
const router = Router()

/*
    verifyTwitter, getBlockchainScore
*/

import {
  verifyTwitter,
  getBlockchainScore,
  handleCaptcha,
} from '../../controllers/tracks.js'

router.post('/captcha', handleCaptcha)
router.post('/twitter', verifyTwitter)
router.post('/blockchain', getBlockchainScore)

export default router
