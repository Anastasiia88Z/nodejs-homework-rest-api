const express = require('express')

const { auth, upload, validation, ctrlWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user')

const router = express.Router()

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(ctrl.signup))

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login))

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

module.exports = router
