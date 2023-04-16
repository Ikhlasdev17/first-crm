import { z } from 'zod'

export const requiredString = (message: string) => {
	return z.string({
		required_error: message,
	})
}

export const passRequired = () => requiredString('password is required!')
export const usernameRequired = () => requiredString('username is required!')
