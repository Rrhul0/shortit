import { Path, Url } from '@prisma/client'
import { UrlWithPaths } from '../../app/beta/page'
import ShowUrl from './showUrl'
// import ShowPaths from './showPaths'
// import ShowUrl from './showUrl'

export default function ShowAllUrls({ urls }: { urls: UrlWithPaths[] }) {
	return (
		<ol className='p-4 self-stretch flex flex-wrap gap-4 '>
			{urls
				.map((url, index) => (
					<ShowUrl
						key={url.id}
						url={url}
						urlIndex={index}
					/>
				))
				.reverse()}
		</ol>
	)
}

// {processing ? (
//     <li className='border rounded-lg px-3 py-2 bg-stone-100 shadow-xl'>
//         <div className='p-2 text-xl font-semibold'>
//             <a
//                 href={processing}
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-pink-500  hover:text-pink-600'
//             >
//                 {processing}
//             </a>
//         </div>
//         <div className='flex flex-wrap gap-2 items-stretch bg-stone-200 p-2 rounded-lg'>
//             <ShowPaths />
//         </div>
//     </li>
// ) : null}
