import { request, response } from 'express'
import { updateImage } from '../helpers/update-image.js'

export const fileUpload = async (req = request, res = response) => {
  const { category, id } = req.params

  const validCategories = ['hospitals', 'doctors', 'users']
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      ok: false,
      message: 'Category is not hospitals | doctors | users'
    })
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      message: 'No files were uploaded'
    })
  }
  const { image } = req.files
  const splittedName = image.name.split('.')
  const fileExtension = splittedName[splittedName.length - 1]
  // Validate extensions
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif']
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      message: 'File name extension is not png | jpg | jpeg | gif'
    })
  }
  const fileName = `${crypto.randomUUID()}.${fileExtension}`
  // Path to save image
  const path = `./uploads/${category}/${fileName}`
  image.mv(path, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        ok: false,
        message: 'Error saving image'
      })
    }
  })
  await updateImage({ category, fileName, id })
  return res.json({
    ok: true,
    message: 'File uploaded!',
    fileName
  })
}
