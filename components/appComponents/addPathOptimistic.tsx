'use client'
import { Path } from '@prisma/client'
import { experimental_useOptimistic as useOptimistic } from 'react'

import React from 'react'
import CopyUrl from './copyUrl'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from '../../lib/prisma'
import { revalidatePath } from 'next/cache'
import { submitAction } from '../../lib/submitPathAction'

export default async function AddPathOptimistic({
	paths,
	urlId
}: {
	paths: any
	urlId: number
}) {
	const [optimisticPaths, addOptimisticPath] = useOptimistic(
		paths,
		(state, newPath) => [...state, { path: newPath, sending: true }]
	)

	return (
		<>
			{optimisticPaths.map(m => (
				<li
					className='group relative'
					key={m.path}
				>
					<div className='bg-blue-300 bg-opacity-30 group-hover:blur-[1.5px] text-blue-700 transition-all px-2 py-1 rounded-xl'>
						{m.path}
						{m.sending ? 'sending' : ''}
					</div>
					<CopyUrl path={m.path} />
				</li>
			))}
			<form
				action={e => {
					const newPath = e.get('path') as string
					//can not be empty path
					if (!newPath) return

					const pathWithoutSpaces = newPath.replaceAll(' ', '-')
					addOptimisticPath(pathWithoutSpaces)
					submitAction(pathWithoutSpaces, urlId)
				}}
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
		</>
	)
}
