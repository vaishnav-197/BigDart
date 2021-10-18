const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../model/model')

passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        firstName: 'firstName',
        lastName: 'lastName'

      },
      async (email, password, firstName, lastName, done) => {
        try {
          const user = await UserModel.create({
              email,
              password,
              firstName,
              lastName
             })
          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email })
          if (!user) {
            return done(null, false, { message: 'User not found' })
          }
          const validate = await user.isValidPassword(password)
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' })
          }
          return done(null, user, { message: 'Logged in Successfully' })
        } catch (error) {
          return done(error)
        }
      }
    )
  )
