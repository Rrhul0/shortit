import { useContext } from 'react'
import { URLsContext } from './contexts/URLsContext'
import ShowPaths from './showPaths'
import ShowUrl from './showUrl'

export default function ShowAllUrls({ processing }: { processing: string | null }) {
    const { urls } = useContext(URLsContext)

    return (
        <ol className='p-4 self-stretch flex flex-col gap-4'>
            {/* temporary solution for showing same design for processing url */}
            {processing ? (
                <li className='border rounded-lg px-3 py-2 bg-stone-200'>
                    <div className='p-2 text-xl font-semibold'>
                        <a
                            href={processing}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-pink-500  hover:text-pink-600'
                        >
                            {processing}
                        </a>
                    </div>
                    <div className='flex flex-wrap gap-2 items-stretch bg-stone-300 p-2 rounded-lg'>
                        <ShowPaths />
                    </div>
                </li>
            ) : null}

            {urls?.map((url, index) => <ShowUrl key={url.id} url={url} urlIndex={index} />).reverse()}
        </ol>
    )
}
