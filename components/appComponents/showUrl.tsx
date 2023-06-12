import { UrlWithPaths } from '../../app/beta/page'
import AddPathClient from './addPathClient'
import ShowPaths from './showPaths'

export default function ShowUrls({
	urlIndex,
	url
}: {
	url: UrlWithPaths
	urlIndex: number
}) {
	const paths = url.paths
	const hostname = process.env.NEXTAUTH_URL + '/'

	return (
		<li
			key={url.id}
			className='border rounded-lg px-3 py-2 shadow-xl flex-grow backdrop-blur-lg bg-white bg-opacity-50'
		>
			<div className='p-2 text-xl font-semibold'>
				<a
					href={url.to_url}
					target='_blank'
					rel='noopener noreferrer'
					className='text-pink-500 hover:underline hover:underline-offset-1 '
				>
					{url.to_url}
				</a>
				{/*TODO: add delete or edit url button */}
			</div>

			<ul className='border-t flex flex-wrap gap-x-2 gap-y-3 items-stretch py-2.5 '>
				<ShowPaths path={hostname + url.id} />

				{paths.length
					? paths.map(path => (
							<ShowPaths
								key={path.id}
								path={hostname + path.path}
							/>
					  ))
					: null}
			</ul>
			<AddPathClient urlId={url.id} />
		</li>
	)
}
