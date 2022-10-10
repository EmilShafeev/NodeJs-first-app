import { isUUID } from '../../helpers/authHelper'

describe('UUID validate', () => {
	test('Valid UUID', async () => {
		const res = isUUID('0c63b29e-31d4-46c4-9116-bdc4035af2dd')
		expect(res).toBeTruthy()
	})
	test('Inalid UUID', async () => {
		const res = isUUID('password')
		expect(res).not.toBeTruthy()
	})
})
