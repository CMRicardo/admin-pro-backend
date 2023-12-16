import { request, response } from 'express'
import { Doctor } from '../models/doctor.model.js'

export const getDoctors = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'GET Doctors'
  })
}

export const createDoctors = async (req = request, res = response) => {
  const uid = req.uid
  const doctor = new Doctor({ ...req.body, user: uid })
  try {
    const savedDoctor = await doctor.save()

    return res.json({
      ok: true,
      doctor: savedDoctor
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected server error'
    })
  }
}
export const updateDoctors = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'PUT Doctors'
  })
}
export const deleteDoctors = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'DELETE Doctors'
  })
}
