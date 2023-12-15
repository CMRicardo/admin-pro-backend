import { Router } from 'express'

import { createUser, getUsers } from '../controllers/users.controller.js'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields.js'

export const usersRouter = new Router()

usersRouter.get('/', getUsers)
usersRouter.post('/', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('password', 'Password is required').notEmpty(),
  validateFields
],
createUser
)
