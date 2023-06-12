'use server'

import prisma from './prisma'

export async function submitAction(path: string, urlId: number) {
	await prisma.path.create({ data: { path, urlId } })
	// revalidatePath('/beta')
}
