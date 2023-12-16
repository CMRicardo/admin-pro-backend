import { Router } from 'express'
import { check } from 'express-validator'

import { createHospital, deleteHospital, getHospitals, updateHospital } from '../controllers/hospitals.controller.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const hospitalsRouter = Router()

hospitalsRouter.get('/', validateJWT, getHospitals)
hospitalsRouter.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    validateFields
  ],
  createHospital
)
hospitalsRouter.put(
  '/:id',
  [],
  updateHospital
)
hospitalsRouter.delete('/:id', [], deleteHospital)
