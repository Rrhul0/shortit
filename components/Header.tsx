import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
	const { data } = useSession()
	const [showMenu, setShowMenu] = useState(false)

	return (
		<header className='relative flex items-center justify-between px-3 sm:px-4 lg:px-8 bg-[#151517]'>
			<h1 className='font-extrabold text-primary text-4xl drop-shadow-lg flex flex-col sm:flex-row items-baseline sm:gap-2'>
				ShortIt
			</h1>
			<div>
				{!data?.user ? (
					<div className='flex gap-2'>
						<Link
							href='/api/auth/signin'
							onClick={() => signIn()}
							className='px-2 py-1 border border-transparent text-primary rounded-md transition-all hover:border-blue-600'
						>
							Log In
						</Link>
						<Link
							href='/api/auth/signin'
							onClick={() => signIn()}
							className='border px-2 py-1 rounded-md border-blue-600 text-primary transition-all hover:bg-blue-600'
						>
							Sign Up
						</Link>
					</div>
				) : (
					<button
						onClick={() => setShowMenu(o => !o)}
						className='h-10 w-10 rounded-full overflow-hidden grid place-items-center bg-gray-300'
					>
						{data.user.image ? (
							<span
								className='w-10 h-10 bg-white bg-cover bg-no-repeat'
								style={{
									backgroundImage: `url('${data.user.image}')`
								}}
							></span>
						) : (
							<div className='text-2xl font-semibold text-purple-600'>
								{data?.user?.email?.charAt(0).toUpperCase()}
							</div>
						)}
						<div
							className={`absolute px-3 py-2 z-50 backdrop-blur-sm  top-16 right-2 bg-slate-400 bg-opacity-50 rounded-xl gap-2 flex flex-col ${
								showMenu ? ' ' : 'hidden'
							}`}
						>
							<strong>
								{data.user.name ||
									data.user.email?.split('@')[0]}
							</strong>
							<small>{data.user.email}</small>
							<Link
								href='/api/auth/signout'
								onClick={e => {
									e.preventDefault()
									signOut()
									localStorage.clear()
								}}
								className='bg-purple-100 rounded-lg text-xl hover:bg-purple-200 transition-all duration-500'
							>
								Log Out
							</Link>
						</div>
					</button>
				)}
			</div>
		</header>
	)
}
