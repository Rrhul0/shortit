'use client'

import { useRef } from 'react'
import { submitAction } from '../../lib/createUrlAction'

const CreateUrlForm = ({ userId }: { userId?: string }) => {
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<form
			action={async e => {
				await submitAction(e, userId)
				formRef.current?.reset()
			}}
			ref={formRef}
			className='flex gap-3 w-full text-lg justify-center'
		>
			<input
				placeholder='Your large URL'
				name='url'
				className='px-3 rounded-lg w-3/5 sm:w-2/5 md:w-1/2 lg:w-2/5 drop-shadow-lg bg-stone-100 border-2 border-stone-100 focus:border-violet-600 transition-colors hover:border-violet-400 focus:outline-none focus:bg-white'
			/>
			<button
				type='submit'
				className='transition-all text-white tracking-wider drop-shadow-lg bg-violet-500 rounded-lg px-3 py-2 hover:bg-violet-600 active:shadow-inner'
			>
				Short It
			</button>
		</form>
	)
}

export default CreateUrlForm
