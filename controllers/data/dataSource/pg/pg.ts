import pg, { Client } from 'pg'
import Note from '../../../../models/note'
import User from '../../../../models/user/user'
import DataSource from '../dataSource'

export default class PG extends DataSource {
	private pgClient!: Client

	async init() {
		//pg.types.setTypeParser()
		this.pgClient = new Client()
		await this.pgClient.connect()
	}

	async dispose() {
		await this.pgClient.end()
	}

	async getAllNotes() {
		const noteRows = (
			await this.pgClient.query(
				`SELECT public."NOTE"."name", public."NOTE"."content", public."USER".login FROM "NOTE" INNER JOIN "USER" ON "NOTE".author_user = "USER".id `
			)
		).rows as { name: string; content: string; login: string }[]

		return noteRows.map((row) => new Note(row.login, row.name, row.content))
	}
	async getUser(login: string) {
		const userRows = (
			await this.pgClient.query(
				`SELECT x.* FROM "USER" x WHERE login = $1`,
				[login]
			)
		).rows as { pass: string; login: string; role: string }[]

		const userRow = userRows[0]
		if (typeof userRow === 'undefined') return null

		return new User(userRow.login, userRow.pass, parseInt(userRow.role))
	}
	async getUserNotes(login: string) {
		const noteRows = (
			await this.pgClient.query(
				`SELECT * FROM public."NOTE" X where X.author_user = (select id from public."USER" u where u.login = $1)`,
				[login]
			)
		).rows as { name: string; content: string; author_user: string }[]

		if (noteRows.length === 0) return null

		return noteRows.map((row) => new Note(login, row.name, row.content))
	}
	async createUser(user: User) {
		await this.pgClient.query(
			`INSERT INTO public."USER" (pass,login,"role") VALUES ('${user.password}','${user.login}','${user.role})'`
		)
	}
	async createNote(note: Note) {
		await this.pgClient.query(
			`INSERT INTO public."NOTE" (name,"content",author_user)	VALUES ('${note.name}','${note.content}', (select id from "USER" where login = '${note.userLogin}'));`
		)
	}
	async createSession(login: string, token: string, time: string) {
		await this.pgClient.query(
			`INSERT INTO public."SESSIONS" (user_id,create_time,"token") VALUES ((select id from "USER" where login = '${login}'),'${time}','${token}')`
		)
	}

	async getSessionCreateTime(token: string) {
		return {
			createTime: (
				await this.pgClient.query(
					`select cast(create_time as varchar(255)) from "SESSIONS" where "token" = $1`,
					[token]
				)
			).rows[0].create_time as string | undefined,
		}
	}
}
