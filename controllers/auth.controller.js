import { request, response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/user.model.js'
import { generateJWT } from '../helpers/jwt.js'

export const login = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    // Email validation
    const userFromDB = await User.findOne({ email })
    if (!userFromDB) {
      return res.status(404).json({
        ok: false,
        message: 'User with that email does not exists!'
      })
    }
    // Password validation
    const validPassword = bcrypt.compareSync(password, userFromDB.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Not valid credentials'
      })
    }
    // JWT
    const token = await generateJWT(userFromDB.id)
    res.json({
      ok: true,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error, check logs'
    })
  }
}
