import authController from '../../controllers/auth/authController'

describe('HASH', () => {
	beforeAll(async () => {
		await authController.init()
	})
	test('Check same pass', async () => {
		const hash1 = authController.hashPass('123')
		const hash2 = authController.hashPass('123')
		expect(hash1).toBe(hash2)
	})
	test('Check different pass', async () => {
		const hash1 = authController.hashPass('123')
		const hash2 = authController.hashPass('1232')
		expect(hash1).not.toBe(hash2)
	})
	test('Check admin as password', async () => {
		const hash1 = authController.hashPass('admin')
		const hash2 =
			'949aa4b59610390edfad214444146c639deb4ad74315caf0b101cb3d5498f40e'
		expect(hash1).toBe(hash2)
	})
})
