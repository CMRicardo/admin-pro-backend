import { request, response } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models/user.model.js'

export const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'x-token header was expected'
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Not valid token'
    })
  }
}

export const validateAdminRole = async (req = request, res = response, next) => {
  const uid = req.uid
  try {
    const userFromDB = await User.findById(uid)
    if (!userFromDB) {
      return res.status(404).json({
        ok: false,
        message: 'User not found'
      })
    }
    if (userFromDB.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        message: 'You must be an admin user'
      })
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    })
  }
}

export const validateAdminRoleOrSameUser = async (req = request, res = response, next) => {
  const uid = req.uid
  const { id } = req.params
  try {
    const userFromDB = await User.findById(uid)
    if (!userFromDB) {
      return res.status(404).json({
        ok: false,
        message: 'User not found'
      })
    }
    if (userFromDB.role === 'ADMIN_ROLE' && uid === id) {
      next()
    } else {
      return res.status(403).json({
        ok: false,
        message: 'You must be an admin user'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error'
    })
  }
}
