import { Request, Response } from 'express'
import { Link } from '../entities/Links'

export const LinkController = {
	async getAll(req: Request, res: Response) {
		const builder = Link.createQueryBuilder()

		const page: number = parseInt(req.query.page as any) || 1
		const per_page: number = parseInt(req.query.per_page as any) || 10
		const total = await builder.getCount()
		builder.offset((page - 1) * per_page).limit(per_page)

		const allLinks = await builder.getMany()
		res.status(200).json({
			message: 'success',
			payload: {
				data: allLinks,
				pagination: {
					page,
					per_page,
					last_page: Math.ceil(total / per_page),
				},
			},
		})
	},
	async createLink(req: Request, res: Response) {
		try {
			const { name, price, type } = req.body

			const newLink = new Link()
			;(newLink.type = type), (newLink.name = name), (newLink.price = price)

			const newLinkSaved = await newLink.save()

			res.status(201).json({
				message: 'success',
				payload: newLinkSaved,
			})
		} catch (error) {
			res.status(400).json({
				message: error.message,
			})
		}
	},
}
