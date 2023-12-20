import fs from 'node:fs'

import { Doctor } from '../models/doctor.model.js'
import { User } from '../models/user.model.js'
import { Hospital } from '../models/hospital.model.js'

export const updateImage = async ({ category, id, fileName } = {}) => {
  switch (category) {
    case 'doctors':{
      const doctor = await Doctor.findById(id)
      if (!doctor) {
        console.log("There's no doctor with that id")
        return false
      }
      const oldPath = `./uploads/doctors/${doctor.img}`
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath)
      }
      doctor.img = fileName
      await doctor.save()
      return true
      break
    };
    case 'hospitals':{
      break
    };
    case 'users':{
      break
    };

    default:
      break
  }
}
