import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
    const { data } = useSession()
    const [showMenu, setShowMenu] = useState(false)

    return (
        <header className='relative flex items-center justify-between px-8 bg-[#151517]'>
            <h1 className='font-extrabold text-[#E5E2E1] text-4xl text-center drop-shadow-lg'>
                ShortIt : <span className='font-bold text-2xl'>Create and Manage Short URLs</span>
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
                                style={{ backgroundImage: `url('${data.user.image}')` }}
                            ></span>
                        ) : (
                            <div className='text-2xl font-semibold text-purple-600'>{data?.user?.name?.charAt(0)}</div>
                        )}
                        <div
                            className={`absolute px-3 py-2 z-50 backdrop-blur-sm  top-16 right-2 bg-slate-400 bg-opacity-50 rounded-xl gap-2 flex flex-col ${
                                showMenu ? ' ' : 'hidden'
                            }`}
                        >
                            <strong>{data.user.name}</strong>
                            <small>{data.user.email}</small>
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
                )}
            </div>
        </header>
    )
}
