import { Request, Response } from 'express'
import { User } from '../entities/User'
import { Employee } from '../entities/Employees'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
export const EmployeeController = {
	async getAll(req: Request, res: Response) {
		const builder = Employee.createQueryBuilder('employee')

		const page: number = parseInt(req.query.page as any) || 1
		const per_page: number = parseInt(req.query.per_page as any) || 10
		const total = await builder.getCount()
		builder.offset((page - 1) * per_page).limit(per_page)

		const allEmployees = await (
			await builder.getMany()
		).map(x => {
			const { password, ...obj } = x
			return obj
		})
		res.json({
			message: 'Success',
			payload: {
				data: allEmployees,
				pagination: {
					page,
					per_page,
					last_page: Math.ceil(total / per_page),
				},
			},
		})
	},
	async createEmployee(req: Request, res: Response) {
		try {
			if (req.employeeData?.id) {
				res.status(422).json({
					message: 'phone number already exist!',
					success: false,
				})
				return
			}

			const { username, phone, password, role } = req.body
			const newUser = new Employee()
			const hashedPass = await bcrypt.hash(password, 10)

			newUser.phone = phone
			newUser.username = username
			newUser.password = hashedPass
			newUser.role = role || 'ceo'

			await newUser
				.save()
				.then(r => {
					const { password: pass, ...data } = newUser
					res.status(200).json({
						message: 'success',
						payload: data,
					})
				})
				.catch(err => {
					res.status(400).json({ message: err.message })
					console.log(err)
				})
		} catch (error) {
			console.log(error)
			res.status(400).json(error)
		}
	},
	async signIn(req: Request, res: Response) {
		try {
			const { phone, password } = req.body

			const passwordIsMatch = await bcrypt.compare(
				password,
				req?.employeeData?.password || ''
			)

			const token = jwt.sign({ data: req.employeeData }, 'secret first')

			if (passwordIsMatch) {
				res.status(200).json({
					message: 'success',
					payload: {
						token,
						phone: req.employeeData?.phone || '',
						username: req.employeeData?.username || '',
						id: req.employeeData?.id || '',
						role: req.employeeData?.role || '',
					},
				})
			} else {
				res.status(401).json({
					message: 'Phone or password is incorrect!',
				})
			}
		} catch (error) {
			res.status(400).json({
				message: 'bad request!',
			})
		}
	},
	async getMe(req: Request, res: Response) {
		if (req.token) {
			res.status(200).json({
				message: 'success',
				success: true,
				payload: {
					phone: req.employeeData?.phone,
					id: req.employeeData?.id,
					role: req.employeeData?.role,
					username: req.employeeData?.username,
				},
			})
		} else {
			res.status(401).json({
				message: 'unauthenticated!',
			})
		}
	},
}
