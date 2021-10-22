const jwt = require('jsonwebtoken')
const { use } = require('passport')
const User = require('../models/user')

const auth = {

  //* Register
  register: async function (req, res) {
    const {
      email,
      username,
      password,
      confPassword,
      phone
    } = req.body

    // * Input Validation
    if ((!username) || (!password) || (!email) || (!phone) || (!confPassword)) {
      res.status(400).send({
         success: false,
         msg: 'Enter all fields'
        })
      console.log('all fields req')
    }
    if (password.length < 6) {
      res.status(400).send({
         success: false,
         msg: 'Password length less than 6'
        })
        console.log('length of  less than 6')
    }
    if (password !== confPassword) {
      res.status(400).send({
        success: false,
        msg: 'Passwords does not match'
      })
        console.log('no match passwords')
    }

    //* Check for Existing Mail
    if (email) {
      User.findOne({
        email: email
      }).then(user => {
        if (user) {
          res.status(400).send({
            success: false,
            msg: 'email id already taken'
          })
          console.log('email taken')
        } else {
          const newUser = User({
            username: username,
            password: password,
            email: email,
            phone: phone
        })
        newUser.save((err, newUser) => {
          if (err) {
            res.status(400).send({
              success: false,
              msg: 'Failed to save',
              err: err
            })
              console.log('failed to save ', err)
          } else {
            res.status(200).send({
              success: true,
              msg: 'Successfully saved',
              data: newUser
            })
              console.log('saved success')
          }
        })
      }
    })
  }
  },

  // //* Login
  login: (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({
                  success: false,
                  msg: 'Authentication Failed, User not found'
                })
                console.log('auth failed')
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        const secret = process.env.SECRET
                        const token = jwt.sign({
                          id: user.id,
                          email: user.email,
                          username: user.username
                        }, `${secret}`)
                        res.status(200).send({
                          success: true,
                          token: token,
                          user: user
                        })
                    } else {
                        return res.status(403).send({
                          success: false,
                          msg: 'Authentication failed, wrong password'
                        })
                    }
                })
            }
    }
    )
}

}

module.exports = auth
