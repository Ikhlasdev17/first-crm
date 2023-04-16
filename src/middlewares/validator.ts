import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validator =
	(schema: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			})
			next()
		} catch (error) {
			res.status(400).json({
				message:
					error?.issues[0]?.message || 'Bad request! All field required!',
				success: false,
			})
		}
	}
