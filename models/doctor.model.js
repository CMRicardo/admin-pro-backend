import { model, Schema } from 'mongoose'

const DoctorSchema = Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  }
})

DoctorSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export const Doctor = model('Doctor', DoctorSchema)
