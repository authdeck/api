import { Router } from 'express'
const router: Router = Router()

import { getUser, loginUser, getUserApp } from "../../controllers/user";

router.post("/login", loginUser)
router.get("/@me", getUser)
router.post("/", getUserApp)

export default router
