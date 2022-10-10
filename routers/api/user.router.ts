import express from 'express'
import authController from '../../controllers/auth/authController'
import dataController from '../../controllers/data/dataController'
import { dbDataTimeNow } from '../../helpers/authHelper'
import { Requests } from '../req&res'
import crypto from 'crypto'
import accessRouterFor from '../checkers/access.checker'
import { UserRole } from '../../models/user/user.enum'

const userRouter = express.Router()

userRouter.use('/*', accessRouterFor(UserRole.ADMIN))

userRouter.get('/info/:login', async (req, res, next) => {
	res.send(await dataController.dataSource.getUser(req.params.login))
})

export default userRouter
