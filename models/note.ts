import User from './user/user'

export default class Note {
	userLogin: string
	name: string
	content: string

	constructor(userLogin: string, name: string, content: string) {
		this.userLogin = userLogin
		this.name = name
		this.content = content
	}
}
