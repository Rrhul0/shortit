import { getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import UserLogin from './userLogin'
import UserMenu from './userMenu'

export default async function Header() {
	const session = await getServerSession(authOptions)

	return (
		<header className='relative flex items-center justify-between px-3 sm:px-4 lg:px-8 bg-[#151517]'>
			<h1 className='font-extrabold text-primary text-4xl drop-shadow-lg flex flex-col sm:flex-row items-baseline sm:gap-2'>
				ShortIt
			</h1>
			{!session?.user ? <UserLogin /> : <UserMenu user={session.user} />}
		</header>
	)
}
