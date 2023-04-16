declare namespace Express {
	export interface Request {
		employeeData?: {
			password?: string
			id?: number
			phone?: string
			username?: string
			role?: string
		}
		token?: string
	}
}
