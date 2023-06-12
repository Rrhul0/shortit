'use client'
import { DefaultUser } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function UserMenu({
	user
}: {
	user: DefaultUser & {
		id: string | undefined
	}
}) {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<button
			onClick={() => setShowMenu(o => !o)}
			className='h-10 w-10 rounded-full overflow-hidden grid place-items-center bg-gray-300'
		>
			{user.image ? (
				<span
					className='w-10 h-10 bg-white bg-cover bg-no-repeat'
					style={{
						backgroundImage: `url('${user.image}')`
					}}
				></span>
			) : (
				<div className='text-2xl font-semibold text-purple-600'>
					{user.email?.charAt(0).toUpperCase()}
				</div>
			)}
			<div
				className={`absolute px-3 py-2 z-50 backdrop-blur-sm  top-16 right-2 bg-slate-400 bg-opacity-50 rounded-xl gap-2 flex flex-col ${
					showMenu ? ' ' : 'hidden'
				}`}
			>
				<strong>{user.name || user.email?.split('@')[0]}</strong>
				<small>{user.email}</small>
				<Link
					href='/api/auth/signout'
					onClick={e => {
						e.preventDefault()
						signOut()
					}}
					className='bg-purple-100 rounded-lg text-xl hover:bg-purple-200 transition-all duration-500'
				>
					Log Out
				</Link>
			</div>
		</button>
	)
}
