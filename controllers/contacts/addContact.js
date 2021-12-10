const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const addContact = async (req, res) => {
  const { _id } = req.user
  const result = await Contact.create({ ...req.body, owner: _id })
  if (!result) {
    throw new NotFound('missing required name field')
  }
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}
module.exports = addContact
