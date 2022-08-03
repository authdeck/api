import { Router } from 'express'
const router = Router()

/*
    verifyTwitter, getBlockchainScore
*/

import { verifyTwitter, getBlockchainScore } from '../../controllers/tracks'

router.post('/twitter', verifyTwitter)
router.post('/blockchain', getBlockchainScore)

export default router
