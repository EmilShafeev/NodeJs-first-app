import express from 'express'
import dataController from '../../controllers/data/dataController'

const noteRouter = express.Router()

noteRouter.get('/(:author)?', async (req, res, next) => {
	if (req.params.author) {
		res.send(
			await dataController.dataSource.getUserNotes(req.params.author)
		)
	} else {
		res.send(await dataController.dataSource.getAllNotes())
	}
})

export default noteRouter
