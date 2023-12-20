import { Router } from 'express'

import { validateJWT } from '../middlewares/validate-jwt.js'
import { fileUpload } from '../controllers/uploads.controller.js'
import expressFileUpload from 'express-fileupload'

export const uploadsRouter = Router()
uploadsRouter.use(expressFileUpload())

uploadsRouter.put('/:category/:id', [validateJWT], fileUpload)
