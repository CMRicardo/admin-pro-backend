import { response } from 'express'
import bcrypt from 'bcryptjs'

import { User } from '../models/user.model.js'
import { generateJWT } from '../helpers/jwt.js'

export const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email google role img')
  res.json({
    ok: true,
    users,
    uid: req.uid
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
    const token = await generateJWT(user.id)

    await user.save()

    res.json({
      ok: true,
      token,
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

export const updateUser = async (req, res = response) => {
  // TODO: Validate token

  const uid = req.params.id

  try {
    const userFromDB = await User.findById(uid)
    if (!userFromDB) {
      return res.status(404).json({
        ok: false,
        message: 'User not found!'
      })
    }

    const { password, google, email, ...fields } = req.body
    if (userFromDB.email !== email) {
      const emailExist = await User.findOne({ email })
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          message: 'Email already exists!'
        })
      }
    }
    fields.email = email
    const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true })

    res.json({
      ok: true,
      user: updatedUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error, check logs'
    })
  }
}

export const deleteUser = async (req, res = response) => {
  const uid = req.params.id

  try {
    const userFromDB = await User.findById(uid)
    if (!userFromDB) {
      return res.status(404).json({
        ok: false,
        message: 'User not found!'
      })
    }

    await User.findByIdAndDelete(uid)
    res.json({
      ok: true,
      message: 'User deleted'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error, check logs'
    })
  }
}
