import { Router } from 'express'
import { check } from 'express-validator'

import { login } from '../controllers/auth.controller.js'
import { validateFields } from '../middlewares/validate-fields.js'

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
