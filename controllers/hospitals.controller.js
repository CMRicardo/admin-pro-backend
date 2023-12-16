import { request, response } from 'express'

export const getHospitals = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'GET Hospitals'
  })
}

export const createHospital = async (req = request, res = response) => {
  return res.json({
    ok: true,
    message: 'POST Hospitals'
  })
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
