import { Router } from 'express'
import { check } from 'express-validator'

import { createDoctors, deleteDoctors, getDoctors, updateDoctors } from '../controllers/doctors.controller.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const doctorsRouter = Router()

doctorsRouter.get('/', getDoctors)
doctorsRouter.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    check('hospital', 'Hospital id is required').notEmpty().isMongoId(),
    validateFields
  ],
  createDoctors
)
doctorsRouter.put(
  '/:id',
  [],
  updateDoctors
)
doctorsRouter.delete('/:id', [], deleteDoctors)
