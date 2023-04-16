import { number, object, string, z } from 'zod'

export const LinksSchema = object({
	body: object({
		name: string({
			required_error: 'name is required!',
		}),
		price: number({
			required_error: 'price is required!',
		}),
		type: string(),
	}),
})
