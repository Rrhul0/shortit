import CopyUrl from './copyUrl'

const ShowPaths = ({ path }: { path: string }) => {
	return (
		<li className='group relative'>
			<div className='bg-blue-300 bg-opacity-30 group-hover:blur-[1.5px] text-blue-700 transition-all px-2 py-1 rounded-xl'>
				{path}
			</div>
			<CopyUrl path={path} />

			{/*TODO: add share and delete or edit button */}
		</li>
	)
}

export default ShowPaths
