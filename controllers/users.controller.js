import { response } from 'express'
import bcrypt from 'bcryptjs'

import { User } from '../models/user.model.js'

export const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email google role img')
  res.json({
    ok: true,
    users
  })
}

export const createUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        message: 'Email already exists!'
      })
    }
    const user = new User(req.body)
    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.json({
      ok: true,
      user
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error, check logs'
    })
  }
}
