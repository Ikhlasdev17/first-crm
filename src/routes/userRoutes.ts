import express from 'express'
import { authRequired } from '../middlewares/authRequired.middleware'
import { UserController } from '../controllers/userController'
import { validator } from '../middlewares/validator'
import { UserSchema } from '../schemas/UserSchema'
const router = express.Router()

router
	.get('/', authRequired, UserController.getAll)
	.post('/', validator(UserSchema), UserController.createUser)
	.patch('/:id', UserController.updateUser)
export default router
