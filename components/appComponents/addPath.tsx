import { getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from '../../lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AddPath({ urlId }: { urlId: number }) {
	const session = await getServerSession(authOptions)
	const user = session?.user

	async function submitAction(e: FormData) {
		'use server'
		const newPath = e.get('path') as string
		//can not be empty path
		if (!newPath) return

		const pathWithoutSpaces = newPath.replaceAll(' ', '-')

		if (!user) return //or toast him to login first to use this feature
		const userId = user.id

		//check if the url is owned by user or not

		await prisma.path.create({ data: { path: pathWithoutSpaces, urlId } })
		revalidatePath('/beta')
	}

	return (
		<form
			action={submitAction}
			className='flex rounded-md '
		>
			<input
				autoFocus
				type='text'
				name='path'
				className='rounded-l-md px-2 border-y border-l border-stone-100 bg-stone-100 drop-shadow-lg hover:border-blue-400  focus:border-blue-600 focus:outline-none'
			/>
			<button
				type='submit'
				className='bg-emerald-500 px-2 rounded-r-md drop-shadow-lg text-white hover:bg-emerald-600 transition-all'
			>
				Add
			</button>
		</form>
	)
}
