import mongoose from 'mongoose'

export const dbConnection = async () => {
  const CONNECTION_STRING = process.env.DB_CNN

  try {
    await mongoose.connect(CONNECTION_STRING)
    console.log('DB online!')
  } catch (error) {
    console.log(error)
    throw new Error('Error connecting to database, checkout logs')
  }
}
