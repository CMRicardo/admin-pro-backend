import { Router } from 'express'
import { check } from 'express-validator'

import { createUser, deleteUser, getUsers, updateUser } from '../controllers/users.controller.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateAdminRole, validateJWT } from '../middlewares/validate-jwt.js'

export const usersRouter = Router()

usersRouter.get('/', [validateJWT], getUsers)
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
    validateJWT,
    validateAdminRole,
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty().isEmail(),
    check('role', 'Role is required').notEmpty(),
    validateFields
  ],
  updateUser
)
usersRouter.delete('/:id', [validateJWT, validateAdminRole], deleteUser)
