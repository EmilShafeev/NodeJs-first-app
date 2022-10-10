import Note from '../../../models/note'
import User from '../../../models/user/user'

export default abstract class DataSource {
	private _dsName: string

	public get dsName(): string {
		return this._dsName
	}

	constructor(dsName: string) {
		this._dsName = dsName
	}

	abstract init(): Promise<void>
	abstract dispose(): Promise<void>
	abstract createUser(user: User): Promise<void>
	abstract createNote(note: Note): Promise<void>
	abstract createSession(
		login: string,
		token: string,
		time: string
	): Promise<void>
	abstract getUser(login: string): Promise<User | null>
	abstract getUserNotes(login: string): Promise<Note[] | null>
	abstract getAllNotes(): Promise<Note[]>
	abstract getSessionCreateTime(
		token: string,
		login: string
	): Promise<{ createTime: string | undefined }>
}
