import { response } from 'express'

import { User } from '../models/user.model.js'

export const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email google role img')
  res.json({
    ok: true,
    users
  })
}

export const createUser = async (req, res = response) => {
  const { name, email, password } = req.body

  const user = new User(req.body)

  try {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        message: 'Email already exists!'
      })
    }
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
