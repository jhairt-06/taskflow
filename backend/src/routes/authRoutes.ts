import express from 'express'
const router = express.Router()
import {signUpUser, logInUser} from "../controller/authControllers.js"

router.post('/signup', signUpUser)
router.post('/login', logInUser)

export default router