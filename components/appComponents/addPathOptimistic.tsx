'use client'
import { experimental_useOptimistic as useOptimistic } from 'react'

import React from 'react'
import CopyUrl from './copyUrl'
import { submitAction } from '../../lib/submitPathAction'

export default function AddPathOptimistic({
	paths,
	urlId
}: {
	paths: string[]
	urlId: number
}) {
	const [optimisticPaths, addOptimisticPath] = useOptimistic(
		paths,
		(state, newPath: string) => [...state, newPath]
	)

	return (
		<>
			{optimisticPaths.map(path => (
				<div
					className='group relative'
					key={path}
				>
					<div className='bg-blue-300 bg-opacity-30 group-hover:blur-[1.5px] text-blue-700 transition-all px-2 py-1 rounded-xl'>
						{path}
					</div>
					<CopyUrl path={path} />

					{/*TODO: add share and delete or edit button */}
				</div>
			))}
			<form
				action={async e => {
					const newPath = e.get('path') as string
					//can not be empty path
					if (!newPath) return

					const pathWithoutSpaces = newPath.replaceAll(' ', '-')
					addOptimisticPath(pathWithoutSpaces)
					await submitAction(pathWithoutSpaces, urlId)
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
