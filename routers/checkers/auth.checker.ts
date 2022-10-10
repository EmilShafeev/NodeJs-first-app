import express from 'express'
import dataController from '../../controllers/data/dataController'
import {
	isTokenLifeTimeValid,
	isUUID,
	parseBaseAuth,
} from '../../helpers/authHelper'

const authChecker = express.Router()

authChecker.use('/', async (req, res, next) => {
	// Проверка, что есть данные авторизации
	if (!req.headers.authorization) {
		res.send('NEED LOGIN FOR ACCESS')
		return
	}
	// Проверка, что токен - это UUID
	const auth = parseBaseAuth(req.headers.authorization)
	if (!isUUID(auth.token)) {
		res.send('INVALID TOKEN')
		return
	}
	// Получаем время сессии по токену
	const toketCreateTime =
		await dataController.dataSource.getSessionCreateTime(auth.token)

	// Проверка, что токен существует в БД
	if (!toketCreateTime.createTime) {
		res.send("TOKEN DOESN'T EXIST")
		return
	}
	// Проверка, что у токена не истекло время жизни
	if (!isTokenLifeTimeValid(toketCreateTime.createTime)) {
		res.send('TOKEN TIME END, LOGIN AGAIN')
		return
	}
	next()
})

export default authChecker
