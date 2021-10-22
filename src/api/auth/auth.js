const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    // ! debug
    console.log(
      email,
      username,
      password,
      confPassword,
      phone
    )
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
  }

  // //* Login
  // login: () => {

  // }

}

module.exports = auth
