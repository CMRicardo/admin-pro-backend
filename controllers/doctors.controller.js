import { request, response } from 'express'

export const getDoctors = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'GET Doctors'
  })
}

export const createDoctors = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'POST Doctors'
  })
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
