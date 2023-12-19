import { request, response } from 'express'

import { Doctor } from '../models/doctor.model.js'
import { Hospital } from '../models/hospital.model.js'
import { User } from '../models/user.model.js'

export const getAll = async (req = request, res = response) => {
  const { query } = req.params
  const regex = new RegExp(query, 'i')

  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Doctor.find({ name: regex }),
    Hospital.find({ name: regex })
  ])

  return res.json({
    ok: true,
    users,
    doctors,
    hospitals
  })
}

export const getByCollection = async (req = request, res = response) => {
  const { query, topic } = req.params
  const regex = new RegExp(query, 'i')

  let results = []
  switch (topic) {
    case 'hospitals': {
      results = await Hospital
        .find({ name: regex })
        .populate('user', 'name img')
      break
    }
    case 'users': {
      results = await User.find({ name: regex })
      break
    }
    case 'doctors': {
      results = await Doctor
        .find({ name: regex })
        .populate('user', 'name img')
        .populate('hospital', 'name')
      break
    }
    default: {
      return res.status(400).json({
        ok: false,
        message: 'Can only search for hospitals | users | doctors'
      })
    }
  }

  return res.json({
    ok: true,
    results
  })
}
