import { Router } from 'express'
import { check } from 'express-validator'

import { googleSignIn, login, renewToken } from '../controllers/auth.controller.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const authRouter = Router()

authRouter.post(
  '/',
  [
    check('email', 'Email is required').notEmpty().isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields
  ],
  login
)

authRouter.post(
  '/google',
  [
    check('token', 'A token was expected').notEmpty(),
    validateFields
  ],
  googleSignIn
)

authRouter.get('/renew',
  validateJWT,
  renewToken
)
