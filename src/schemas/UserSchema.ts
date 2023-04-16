import { object, string, z } from 'zod'

export const UserSchema = object({
	body: object({
		username: string({
			required_error: 'username is required!',
		}),
		status: z.enum(['clicked', 'called', 'completed'], {
			required_error: 'user status is required!',
		}),
		linkId: string({
			required_error: 'link is required!',
		}),
	}),
})
