import { getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from '../../lib/prisma'
import { Path, Url } from '@prisma/client'
import ShowAllUrls from '../../components/appComponents/showUrls'

export interface UrlWithPaths extends Url {
	paths: Path[]
}

export default async function page() {
	//get user
	const session = await getServerSession(authOptions)
	const user = session?.user

	//get urls of user
	const urls: UrlWithPaths[] | null = user
		? await prisma.url.findMany({
				where: { userId: user.id },
				include: { paths: {} }
		  })
		: null

	return (
		<div className='flex flex-col items-center gap-6 py-4'>
			<h2 className='font-bold sm:text-xl md:text-2xl text-center text-primary'>
				Create short URLs for your large URLs and manage them
			</h2>
			{urls ? <ShowAllUrls urls={urls} /> : null}
		</div>
	)
}
