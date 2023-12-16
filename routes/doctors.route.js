import { Router } from 'express'

import { createDoctors, deleteDoctors, getDoctors, updateDoctors } from '../controllers/doctors.controller.js'

export const doctorsRouter = Router()

doctorsRouter.get('/', getDoctors)
doctorsRouter.post(
  '/',
  [],
  createDoctors
)
doctorsRouter.put(
  '/:id',
  [],
  updateDoctors
)
doctorsRouter.delete('/:id', [], deleteDoctors)
