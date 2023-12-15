import { model, Schema } from 'mongoose'

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  }
})

export default model('User', UserSchema)
