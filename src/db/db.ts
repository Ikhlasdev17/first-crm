import { DataSource } from 'typeorm'
import { User } from '../entities/User'
import { Course } from '../entities/Courses'
import { Link } from '../entities/Links'
import { Employee } from '../entities/Employees'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: 5432,
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || '6875',
	database: process.env.DB_NAME || 'learn',
	entities: [User, Course, Link, Employee],
	synchronize: true,
})
