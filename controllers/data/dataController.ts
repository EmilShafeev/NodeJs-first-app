import Controller from '../controller'
import DataSource from './dataSource/dataSource'
import PG from './dataSource/pg/pg'

class DataController extends Controller {
	private dataSources: DataSource[] = [new PG('PG')]
	dataSource!: DataSource

	async init() {
		await super.init()

		const dsName = process.env.DB
		const ds = this.dataSources.find((ds) => ds.dsName === dsName)

		if (!ds)
			throw new Error(`Неизвестная БД. process.env.DB=${process.env.DB}`)

		this.dataSource = ds

		await this.dataSource.init()
	}
}

export default new DataController()
