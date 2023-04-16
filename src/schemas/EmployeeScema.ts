import {
	passRequired,
	requiredString,
	usernameRequired,
} from '../utils/ValidatorErrors'
import { nativeEnum, z } from 'zod'
const { object, string } = z

export enum EmployeeRoles {
	CEO = 'ceo',
	ADMIN = 'admin',
	TEACHER = 'teacher',
}

export const EmployeeRolesEnum = z.nativeEnum(EmployeeRoles)

export const EmployeeSchema = object({
	body: object({
		username: usernameRequired(),
		phone: string({
			required_error: 'phone is required!',
		}),
		password: passRequired(),
		role: nativeEnum(EmployeeRoles, {
			errorMap: (issue, ctx) => {
				return {
					message: 'Please select employee role, roles: ceo | admin | teacher',
				}
			},
		}),
	}),
})

export const EmployeeLoginSchema = object({
	body: object({
		phone: requiredString('phone is required!'),
		password: passRequired(),
	}),
})
