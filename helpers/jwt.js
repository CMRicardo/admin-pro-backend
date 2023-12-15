import jwt from 'jsonwebtoken'

export const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid
    }

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(new Error('We could not generate a jwt'))
      } else {
        resolve(token)
      }
    })
  })
}
