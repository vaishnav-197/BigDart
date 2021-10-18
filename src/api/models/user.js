const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        index: true

    },
    firstName: {
        type: String,
        required: [true, "can't be blank"],
        index: true

    },
    lastName: {
        type: String,
        required: [true, "can't be blank"],
        default: null
    },
    password: {
        type: String,
        required: [true, "can't be blank"]

    }

})
userSchema.pre(
    'save',
    async (next) => {
      const user = this
      const hash = await bcrypt.hash(user.password, 10)
      this.password = hash
      next()
    }
  )
userSchema.methods.isValidPassword = async (password) => {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel
