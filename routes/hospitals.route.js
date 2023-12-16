import { Router } from 'express'

import { createHospital, deleteHospital, getHospitals, updateHospital } from '../controllers/hospitals.controller.js'

export const hospitalsRouter = Router()

hospitalsRouter.get('/', getHospitals)
hospitalsRouter.post(
  '/',
  [],
  createHospital
)
hospitalsRouter.put(
  '/:id',
  [],
  updateHospital
)
hospitalsRouter.delete('/:id', [], deleteHospital)
