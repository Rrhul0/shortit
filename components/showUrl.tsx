import { useContext, useState } from 'react'
import AddPath from './addPath'
import { UrlWithPaths } from './contexts/URLsContext'
import ShowPaths from './showPaths'

export default function ShowUrls({ urlIndex, url }: { url: UrlWithPaths; urlIndex: number }) {
    const [showAddPath, setShowAddPath] = useState(false)
    const [processing, setProcessing] = useState<string | null>(null)

    const paths = url.paths

    return (
        <li key={url.id} className='border rounded-lg px-3 py-2 bg-stone-100 shadow-xl flex-grow'>
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

            <ul className='flex flex-wrap gap-x-2 gap-y-3 items-center bg-stone-200 px-2 py-2.5  rounded-lg'>
                <ShowPaths path={window.location.href + url.id} />

                {paths.length
                    ? paths.map(path => <ShowPaths key={path.id} path={window.location.href + path.path} />)
                    : null}

                {processing ? <ShowPaths path={window.location.href + processing} /> : null}

                <div className='flex gap-1 h-7'>
                    {showAddPath ? (
                        <AddPath urlIndex={urlIndex} setShowAddPath={setShowAddPath} setProcessing={setProcessing} />
                    ) : null}
                    <button
                        className={
                            (showAddPath ? 'bg-red-400 hover:bg-red-500' : 'bg-emerald-500 hover:bg-emerald-600') +
                            ' transition-all rounded-md px-2 text-white'
                        }
                        onClick={() => setShowAddPath(o => !o)}
                    >
                        {showAddPath ? 'close' : 'Add more'}
                    </button>
                </div>
            </ul>
        </li>
    )
}
