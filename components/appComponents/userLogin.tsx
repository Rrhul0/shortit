'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function UserLogin() {
	return (
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
	)
}
