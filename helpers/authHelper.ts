import moment, { DurationInputArg2 } from 'moment'
import dataController from '../controllers/data/dataController'
import { UserRole } from '../models/user/user.enum'

const DB_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

let _tokenLifeTime: { value: number; timeType: DurationInputArg2 }

export function isTokenLifeTimeValid(createTime: string) {
	if (!process.env.TOKENLIFETIME)
		throw new Error('process.env.TOKENLIFETIME is undefind')

	_tokenLifeTime ??= {
		value: parseInt(process.env.TOKENLIFETIME.split(' ')[0]),
		timeType: process.env.TOKENLIFETIME.split(' ')[1] as DurationInputArg2,
	}

	return moment(createTime, DB_DATE_FORMAT)
		.add(_tokenLifeTime.value, _tokenLifeTime.timeType)
		.isAfter(moment())
}

export function dbDataTimeNow() {
	return moment().format(DB_DATE_FORMAT)
}

export function parseBaseAuth(reqAuth: string) {
	const parsedAuth = Buffer.from(reqAuth.split(' ')[1], 'base64')
		.toString('ascii')
		.split(':')
	return { login: parsedAuth[0], token: parsedAuth[1] }
}

export function isUUID(uuid: string) {
	const result = uuid.match(
		'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
	)
	return result !== null
}

export async function checkUserRole(login: string, accessRole: UserRole) {
	const role = await getUserRole(login)
	return role && role === accessRole
}

export async function getUserRole(login: string) {
	return (await dataController.dataSource.getUser(login))?.role
}
