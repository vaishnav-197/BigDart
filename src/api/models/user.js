const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        min: 6,
        max: 255,
        unique: true,
        index: true

    },
    username: {
        type: String,
        min: 6,
        max: 255,
        required: [true, "can't be blank"],
        index: true

    },
    password: {
        type: String,
        min: 6,
        max: 255,
        required: [true, "can't be blank"]

    },
    date: {
      type: Date,
      default: Date.now()
    },
    phone: {
      type: String,
      min: 10,
      max: 10,
      required: [true, "can't be blank"]
    }

}, { timestamps: true })

userSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err)
          }
          bcrypt.hash(user.password, salt, function (err, hash) {
              if (err) {
                  return next(err)
              }
              user.password = hash
              next()
          })
      })
  } else {
      return next()
  }
})
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
          return cb(err)
      }
      cb(null, isMatch)
  })
}

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel
