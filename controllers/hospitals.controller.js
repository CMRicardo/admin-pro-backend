import { request, response } from 'express'
import { Hospital } from '../models/hospital.model.js'

export const getHospitals = async (req = request, res = response) => {
  const hospitals = await Hospital
    .find()
    .populate('user', 'name img')

  return res.json({
    ok: true,
    hospitals
  })
}

export const createHospital = async (req = request, res = response) => {
  const uid = req.uid
  const hospital = new Hospital({ ...req.body, user: uid })
  try {
    const savedHospital = await hospital.save()
    return res.json({
      ok: true,
      hospital: savedHospital
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected server error'
    })
  }
}

export const updateHospital = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'PUT Hospitals'
  })
}

export const deleteHospital = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'DELETE Hospitals'
  })
}
