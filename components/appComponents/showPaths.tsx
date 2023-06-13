import CopyUrl from './copyUrl'
import { headers } from 'next/headers'

const ShowPaths = ({ path }: { path: string | number }) => {
	let host = headers().get('Host')
	if (host?.includes('localhost') || host?.includes('127.0.0.1'))
		host = 'http://' + host
	else host = 'https://' + host
	const pathWithHost = host + '/' + path

	return (
		<li className='group relative'>
			<div className='bg-blue-300 bg-opacity-30 group-hover:blur-[1.5px] text-blue-700 transition-all px-2 py-1 rounded-xl'>
				{pathWithHost}
			</div>
			<CopyUrl path={pathWithHost} />

			{/*TODO: add share and delete or edit button */}
		</li>
	)
}

export default ShowPaths
