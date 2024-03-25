import { request, response } from 'express'

import { Doctor } from '../models/doctor.model.js'

export const getDoctors = async (req = request, res = response) => {
  const doctors = await Doctor
    .find()
    .populate('user', 'name img')
    .populate('hospital', 'name img')

  return res.json({
    ok: true,
    doctors
  })
}

export const getDoctorById = async (req = request, res = response) => {
  const { id } = req.params
  try {
    const doctor = await Doctor
      .findById(id)
      .populate('user', 'name img')
      .populate('hospital', 'name img')

    return res.json({
      ok: true,
      doctor
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    })
  }
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
  try {
    const { id } = req.params
    const { uid } = req
    const doctor = await Doctor.findById(id)
    if (!doctor) {
      return res.status(404).json({
        ok: false,
        message: 'A doctor with that id was not found'
      })
    }
    const newDoctorData = {
      ...req.body,
      user: uid
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, newDoctorData, { new: true })

    return res.json({
      ok: true,
      doctor: updatedDoctor
    })
  } catch (error) {
    console.log(error)
    return res.json({
      ok: false,
      message: 'Unexpected error'
    })
  }
}
export const deleteDoctors = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const doctor = await Doctor.findById(id)
    if (!doctor) {
      return res.status(404).json({
        ok: false,
        message: 'A doctor with that id was not found'
      })
    }
    await Doctor.findByIdAndDelete(id)

    return res.json({
      ok: true,
      message: 'Doctor deleted succesfully'
    })
  } catch (error) {
    console.log(error)
    return res.json({
      ok: false,
      message: 'Unexpected error'
    })
  }
}
