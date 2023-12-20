import { Router } from 'express'

import expressFileUpload from 'express-fileupload'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { fileUpload } from '../controllers/uploads.controller.js'

export const uploadsRouter = Router()
uploadsRouter.use(expressFileUpload())

uploadsRouter.put('/:category/:id', [validateJWT], fileUpload)
