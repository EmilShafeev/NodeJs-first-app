import express from 'express'
import * as dotenv from 'dotenv'
import PG from './controllers/data/dataSource/pg/pg'
import dataController from './controllers/data/dataController'
import Controller from './controllers/controller'
import apiRouter from './routers/api.router'
import authController from './controllers/auth/authController'
import bodyParser from 'body-parser'
import { parseBaseAuth } from './helpers/authHelper'
import authRouter from './routers/auth.router'

dotenv.config()

const controllers: Controller[] = [dataController, authController]

Promise.all(controllers.map(async (c) => await c.init())).then(() => startApp())

function startApp() {
	const app = express()
	app.use(bodyParser.json())

	app.use(authRouter)
	app.use('/api', apiRouter)

	app.listen(3000, () => {
		console.log('APP STARTED')
	})
}
