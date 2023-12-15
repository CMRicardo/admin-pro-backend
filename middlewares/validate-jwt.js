import { request, response } from 'express'
import jwt from 'jsonwebtoken'

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
