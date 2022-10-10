export default abstract class Controller {
	private isInited = false
	async init() {
		if (this.isInited) throw new Error('Double init Controller')
		this.isInited = true
	}
}
