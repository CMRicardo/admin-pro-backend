import { model, Schema } from 'mongoose'

const HospitalSchema = Schema({
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
  }
})

HospitalSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export const Hospital = model('Hospital', HospitalSchema)
