'use server'

import { revalidatePath } from 'next/cache'
import prisma from './prisma'

export async function submitAction(e: FormData, urlId: number) {
	'use server'
	const newPath = e.get('path') as string
	//can not be empty path
	if (!newPath) return

	const pathWithoutSpaces = newPath.replaceAll(' ', '-')

	// if (!user) return //or toast him to login first to use this feature
	// const userId = user.id

	//check if the url is owned by user or not

	await prisma.path.create({ data: { path: pathWithoutSpaces, urlId } })
	revalidatePath('/beta')
}
