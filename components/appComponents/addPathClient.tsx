'use client'
import React, { useState } from 'react'
import { submitAction } from '../../lib/createPathAction'

export default function AddPathClient({ urlId }: { urlId: number }) {
	const [showForm, setShowForm] = useState(false)

	return (
		<div className='flex gap-1'>
			{showForm ? (
				<form
					action={async e => {
						await submitAction(e, urlId)
						setShowForm(false)
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
			) : null}
			<button
				className={
					(showForm
						? 'bg-red-400 hover:bg-red-500'
						: 'bg-emerald-500 hover:bg-emerald-600') +
					' transition-all rounded-md px-2 text-white drop-shadow-lg'
				}
				onClick={() => setShowForm(o => !o)}
			>
				{showForm ? 'close' : 'Add more'}
			</button>
		</div>
	)
}
