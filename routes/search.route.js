import { Router } from 'express'
import { getAll } from '../controllers/search.controller.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const searchRouter = Router()

searchRouter.get('/:query', validateJWT, getAll)
