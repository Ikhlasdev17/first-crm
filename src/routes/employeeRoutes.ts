import express from 'express'
import { EmployeeController } from '../controllers/employeeControllers'
import { validator } from '../middlewares/validator'
import { EmployeeLoginSchema, EmployeeSchema } from '../schemas/EmployeeScema'
import { checkEmployee } from '../middlewares/checkEmployee.middleware'
import { authRequired } from '../middlewares/authRequired.middleware'
const router = express.Router()

router
	.get('/', authRequired, EmployeeController.getAll)
	.post(
		'/',
		checkEmployee,
		validator(EmployeeSchema),
		EmployeeController.createEmployee
	)
	.post(
		'/signIn',
		validator(EmployeeLoginSchema),
		checkEmployee,
		EmployeeController.signIn
	)
	.get('/getMe', authRequired, checkEmployee, EmployeeController.getMe)

export default router
