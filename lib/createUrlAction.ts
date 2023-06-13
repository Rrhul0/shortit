'use server'

import { revalidatePath } from 'next/cache'
import prisma from './prisma'

export async function submitAction(e: FormData, userId: string | undefined) {
	const url = e.get('url')
	if (!url || typeof url !== 'string') return

	let full_url = encodeURI(url)
	//check url first

	//check if it have https in front of it
	const regexp = /^http(s)?:\/\//
	if (!regexp.test(url)) full_url = 'https://' + full_url

	await prisma.url.create({ data: { to_url: full_url, userId: userId } })
	revalidatePath('/beta')
}
