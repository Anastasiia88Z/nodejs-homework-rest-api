const { Conflict } = require('http-errors')

const { nanoid } = require('nanoid')

const { sendEmail } = require('../../helpers')

const { User } = require('../../models')

const signup = async(req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }

  const verificationToken = nanoid()
  const newUser = new User({ name, email, verificationToken })

  newUser.setPassword(password)
  await newUser.save()
  const mail = {
    to: email,
    subject: 'Confirmation email',
    html: `<a target ='_blank' href='http://localhost:3030/api/users/verify/${verificationToken}'> Confirmation email </a>`
  }

  await sendEmail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        name,

        verificationToken

      }
    }
  })
}

module.exports = signup
