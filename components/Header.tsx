import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
    const { data, status } = useSession()
    return (
        <header className='flex items-center justify-end mx-4'>
            {status === 'unauthenticated' ? (
                <button onClick={() => signIn()} className='underline'>
                    SignIn
                </button>
            ) : (
                <div className='h-10 w-10 rounded-full overflow-hidden grid place-items-center bg-gray-300'>
                    {data?.user?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img width='40' height='40' src={data?.user?.image} alt={data.user.name || ''} />
                    ) : (
                        <div className='text-2xl font-semibold text-purple-600'>{data?.user?.name?.charAt(0)}</div>
                    )}
                </div>
            )}
        </header>
    )
}
