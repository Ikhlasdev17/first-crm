import { NextFunction, Request, Response } from 'express'
import { Employee } from '../entities/Employees'

export const checkEmployee = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const employee = await Employee.findOneBy({ phone: req.body.phone })
	req.employeeData = employee || {}
	next()
}
