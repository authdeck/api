import { Router } from 'express'
const router = Router()

import { getUser, loginUser, getUserApp } from "../../controllers/user.js"

router.post('/login', loginUser)
router.get('/@me', getUser)
router.post('/', getUserApp)

export default router
