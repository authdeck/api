import { Router } from 'express'
const router: Router = Router()

/*
    getUser, loginUser
*/

import { getUser, loginUser } from "../../controllers/user";

router.post("/login", loginUser)
router.post("/", getUser)

export default router
