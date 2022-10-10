import Controller from '../controller'
import { createHmac } from 'crypto'

class AuthController extends Controller {
	private _secret = 'I am ness'
	private sha256Hasher = () => createHmac('sha256', this._secret)

	hashPass = (password: string) =>
		this.sha256Hasher().update(password).digest('hex')
}

export default new AuthController()
