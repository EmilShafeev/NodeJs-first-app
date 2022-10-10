import moment from 'moment'

describe('Tests Moment.js', () => {
	test('Timezone check', async () => {
		const format = 'YYYY-MM-DD HH:mm:ss.SSS'
		console.log(moment('2022-10-09 22:07:04.965', format))
	})
})
