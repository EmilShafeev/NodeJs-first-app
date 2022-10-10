import { UserRole } from './user.enum'

export default class User {
	login: string
	password: string
	role: UserRole

	constructor(login: string, password: string, role: UserRole) {
		this.login = login
		this.password = password
		this.role = role
	}
}
