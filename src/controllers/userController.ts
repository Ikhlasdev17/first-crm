import { Pagination } from '../utils/Pagination'
import { User } from '../entities/User'
import { Request, Response } from 'express'
import { Link } from '../entities/Links'

export const UserController = {
	async getAll(req: Request, res: Response) {
		const builder = User.createQueryBuilder()
		const page: number = parseInt(req.query.page as any) || 1
		const per_page: number = parseInt(req.query.per_page as any) || 10
		const total = await builder.getCount()
		builder.offset((page - 1) * per_page).limit(per_page)

		const allUsers = await builder.getMany()
		res.status(200).json({
			message: 'success',
			payload: {
				data: allUsers,
				pagination: {
					page,
					per_page,
					last_page: Math.ceil(total / per_page),
				},
			},
		})
	},
	async createUser(req: Request, res: Response) {
		const { username, phone, linkId, status } = req.body

		try {
			const currentLink = await Link.findOneBy({ id: linkId })
			console.log(currentLink)
			if (currentLink) {
				const newUser = new User()
				newUser.phone = phone
				newUser.username = username
				newUser.link = currentLink
				newUser.status = status

				const savedUser = await newUser.save()

				currentLink.price_for_single = Math.floor(
					currentLink.price / (currentLink.clicked + 1)
				)
				currentLink.clicked = currentLink.clicked + 1
				await currentLink.save()

				res.status(201).json({
					message: 'success',
					payload: savedUser,
				})
			} else {
				res.status(422).json({
					message: 'Link is not defined!',
				})
			}
		} catch (error) {
			res.status(422).json({
				message: error,
			})
		}
	},

	async updateUser(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { phone, username, status } = req.body
			if (!id) {
				res.status(422).json({
					message: 'id is required',
				})
			}

			const currentUser = await User.findOneBy({ id: Number(id) })

			if (!currentUser) {
				res.status(404).json({
					message: 'user is not defined!',
				})
			} else {
				currentUser.phone = phone || currentUser?.phone
				currentUser.username = username || currentUser?.username
				currentUser.status = status || currentUser?.status
				await currentUser.save()
				res.status(200).json({
					message: 'success',
					payload: currentUser,
				})
			}
		} catch (error) {
			res.status(400).json({
				message: error.message,
			})
		}
	},
}
