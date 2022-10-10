import express from 'express'
import authController from '../../controllers/auth/authController'
import dataController from '../../controllers/data/dataController'
import { dbDataTimeNow } from '../../helpers/authHelper'
import { Requests } from '../req&res'
import crypto from 'crypto'

const userRouter = express.Router()

userRouter.get('info/:login', async (req, res, next) => {
	res.send(await dataController.dataSource.getUser(req.params.login))
})

export default userRouter
