import { Router } from 'express'

import { getUsers } from '../controllers/users.controller.js'

export const usersRouter = new Router()

usersRouter.get('/', getUsers)
