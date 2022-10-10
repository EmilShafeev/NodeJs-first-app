import express from 'express'
import noteRouter from './api/note.router'
import userRouter from './api/user.router'
import authChecker from './checkers/auth.checker'

const apiRouter = express.Router()

apiRouter.use(authChecker)

apiRouter.use('/user', userRouter)
apiRouter.use('/note', noteRouter)

export default apiRouter
