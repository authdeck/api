import { Router } from 'express'
const router = Router()
import auth from "../../middleware/auth.js"
import { getUser, loginUser, getUserApp } from "../../controllers/user.js"

router.post('/login', loginUser)
router.get('/@me', auth, getUser)
router.post('/', getUserApp)

export default router
