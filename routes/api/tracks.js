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
import auth from '../../middleware/auth.js'

router.post('/captcha', auth, handleCaptcha)
router.post('/twitter', auth, verifyTwitter)
router.post('/blockchain', auth, getBlockchainScore)

export default router
