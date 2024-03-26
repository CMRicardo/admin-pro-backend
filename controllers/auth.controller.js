import { request, response } from 'express'
import bcrypt from 'bcryptjs'

import { User } from '../models/user.model.js'
import { generateJWT } from '../helpers/jwt.js'
import { googleVerify } from '../helpers/google-verify.js'
import { buildMenu } from '../helpers/menu-builder.js'

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
      token,
      menu: buildMenu(userFromDB.role)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Unexpected error, check logs'
    })
  }
}

export const googleSignIn = async (req = request, res = response) => {
  try {
    const { name, email, picture } = await googleVerify(req.body.token)
    const userFromDB = await User.findOne({ email })
    let user
    if (!userFromDB) {
      user = new User({ name, email, img: picture, password: '@@@', google: true })
    } else {
      user = userFromDB
      user.google = true
    }
    await user.save()
    const token = await generateJWT(user.id)

    return res.json({
      ok: true,
      name,
      email,
      picture,
      token,
      menu: buildMenu(user.role)
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      ok: false,
      message: 'Wrong google token'
    })
  }
}

export const renewToken = async (req, res = response) => {
  const uid = req.uid
  const user = await User.findById(uid)
  if (!user) {
    return res.status(404).json({
      ok: false,
      message: 'Could not find a user with that id'
    })
  }

  const token = await generateJWT(uid)

  return res.json({
    ok: true,
    token,
    user,
    menu: buildMenu(user.role)
  })
}
