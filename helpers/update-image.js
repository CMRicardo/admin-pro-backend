import fs from 'node:fs'

import { Doctor } from '../models/doctor.model.js'
import { Hospital } from '../models/hospital.model.js'
import { User } from '../models/user.model.js'

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
}

export const updateImage = async ({ category, id, fileName } = {}) => {
  switch (category) {
    case 'doctors': {
      const doctor = await Doctor.findById(id)
      if (!doctor) {
        console.log("There's no doctor with that id")
        return false
      }
      const oldPath = `./uploads/doctors/${doctor.img}`
      deleteImage(oldPath)
      doctor.img = fileName
      await doctor.save()
      return true
    }
    case 'hospitals': {
      const hospital = await Hospital.findById(id)
      if (!hospital) {
        console.log("There's no hospital with that id")
        return false
      }
      const oldPath = `./uploads/hospitals/${hospital.img}`
      deleteImage(oldPath)
      hospital.img = fileName
      await hospital.save()
      return true
    }
    case 'users': {
      const user = await User.findById(id)
      if (!user) {
        console.log("There's no user with that id")
        return false
      }
      const oldPath = `./uploads/users/${user.img}`
      deleteImage(oldPath)
      user.img = fileName
      await user.save()
      return true
    }
  }
}
