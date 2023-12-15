import { Router } from 'express'
import { check } from 'express-validator'

import { createUser, getUsers, updateUser } from '../controllers/users.controller.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const usersRouter = new Router()

usersRouter.get('/', getUsers)
usersRouter.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty().isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields
  ],
  createUser
)
usersRouter.put(
  '/:id',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty().isEmail(),
    check('role', 'Role is required').notEmpty()
  ],
  updateUser
)