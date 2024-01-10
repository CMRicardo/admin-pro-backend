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
  try {
    const { id } = req.params
    const { uid } = req
    const hospital = Hospital.findById(id)
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        message: 'Hospital with that id not found'
      })
    }

    const newHospitalData = {
      ...req.body,
      user: uid
    }
    const updatedHospital = await Hospital.findByIdAndUpdate(id, newHospitalData, { new: true })

    return res.json({
      ok: true,
      updatedHospital
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Unexpected error!'
    })
  }
}

export const deleteHospital = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'DELETE Hospitals'
  })
}
