import express, { Router } from 'express'
import dataController from '../../controllers/data/dataController'
import { checkUserRole, parseBaseAuth } from '../../helpers/authHelper'
import { UserRole } from '../../models/user/user.enum'

const accessRouters = new Map<UserRole, Router>()

function accessRouterFor(userRole: UserRole) {
	if (accessRouters.has(userRole)) return accessRouters.get(userRole)!
	const newAccessRouter = express.Router()

	newAccessRouter.get('/', async (req, res, next) => {
		// Проверка, что есть данные авторизации
		if (!req.headers.authorization) {
			res.send('NEED LOGIN FOR ACCESS')
			return
		}
		const auth = parseBaseAuth(req.headers.authorization)

		const accessed = await checkUserRole(auth.login, userRole)
		if (!accessed) {
			res.send(`Access denied, open only for: ${userRole}`)
			return
		}
		next()
	})

	accessRouters.set(userRole, newAccessRouter)
	return newAccessRouter
}

export default accessRouterFor
