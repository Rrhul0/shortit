import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const MAX_NUMBER_OF_URLS = 10

const data = Array.from({ length: MAX_NUMBER_OF_URLS }).map(() => ({
	path: faker.word.noun(),
	url: faker.internet.url()
}))

async function main() {
	for (let entry of data) {
		await prisma.url.create({
			data: {
				to_url: entry.url
			}
		})
	}
}

main().finally(async () => {
	await prisma.$disconnect()
})
