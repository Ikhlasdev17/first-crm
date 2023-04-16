import express from 'express'
import { LinkController } from '../controllers/linksController'
import { authRequired } from '../middlewares/authRequired.middleware'
import { validator } from '../middlewares/validator'
import { LinksSchema } from '../schemas/LinksSchema'
const router = express.Router()

router
	.get('/', authRequired, LinkController.getAll)
	.post('/', authRequired, validator(LinksSchema), LinkController.createLink)

export default router
