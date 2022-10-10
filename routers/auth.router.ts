import express from 'express'
import authController from '../controllers/auth/authController'
import dataController from '../controllers/data/dataController'
import { dbDataTimeNow } from '../helpers/authHelper'
import { Requests } from './req&res'
import crypto from 'crypto'

const authRouter = express.Router()

authRouter.post('/auth', async (req, res, next) => {
	const { login, password } = req.body as Requests.Auth
	const user = await dataController.dataSource.getUser(login)

	if (!user) {
		res.send(`Invalid user login: ${login}`)
		return
	}
	if (!password || authController.hashPass(password) !== user.password) {
		res.send(`Invalid password`)
		return
	}

	const token = crypto.randomUUID()
	const time = dbDataTimeNow()

	await dataController.dataSource.createSession(login, token, time)
	res.send(token)
})

export default authRouter
