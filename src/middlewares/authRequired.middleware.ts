import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export const authRequired = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const headers = req.headers.authorization
	const token = headers?.split(' ')[1] || ''

	if (!headers) {
		res.status(401).json({
			message: 'unauthenticated!',
		})
	} else {
		const tokenVerify = jwt.verify(token, 'secret first')

		if (!tokenVerify) {
			res.status(401).json({
				message: 'unauthenticated!',
			})
		} else {
			req.token = token
			next()
		}
	}
}
