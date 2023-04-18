import express from 'express'
import dotenv from 'dotenv'
import { AppDataSource } from './db/db'
import { routes } from './routes'
import { pagination } from 'typeorm-pagination'
dotenv.config()
const app = express()
import cors from 'cors'
const main = async () => {
	await AppDataSource.initialize()
		.then(async res => {
			app.use(express.json())
			app.use(pagination)
			app.use(cors())
			app.use('/api/employee', routes.employeeRoutes)
			app.use('/api/link', routes.linkRoutes)
			app.use('/api/users', routes.userRoutes)
			console.log('Database connected successful!')
			app.listen(5000, () => {
				console.log('Server started been on port 5000')
			})
		})
		.catch(err => {
			console.log(err.message)
		})
}

main()
