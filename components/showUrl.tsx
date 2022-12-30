import { useContext, useState } from 'react'
import AddPath from './addPath'
import { UrlWithPaths } from './contexts/URLsContext'
import ShowPaths from './showPaths'

export default function ShowUrls({ urlIndex, url }: { url: UrlWithPaths; urlIndex: number }) {
    const [showAddPath, setShowAddPath] = useState(false)
    const [processing, setProcessing] = useState<string | null>(null)

    const paths = url.paths

    return (
        <li key={url.id} className='border rounded-lg px-3 py-2 bg-stone-100'>
            <div className='p-2 text-xl font-semibold'>
                <a
                    href={url.to_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-pink-500  hover:text-pink-600'
                >
                    {url.to_url}
                </a>
                {/*TODO: add delete or edit url button */}
            </div>

            <ul className='flex flex-wrap gap-2 items-stretch bg-stone-200 p-2 rounded-lg'>
                <li>
                    <ShowPaths path={window.location.href + url.id} />
                </li>
                {paths.length
                    ? paths.map(path => (
                          <li key={path.id}>
                              <ShowPaths path={window.location.href + path.path} />
                          </li>
                      ))
                    : null}
                {processing ? (
                    <li>
                        <ShowPaths path={window.location.href + processing} />
                    </li>
                ) : null}
                <li className='flex gap-4'>
                    {showAddPath ? (
                        <AddPath urlIndex={urlIndex} setShowAddPath={setShowAddPath} setProcessing={setProcessing} />
                    ) : null}
                    <button
                        className={(showAddPath ? 'bg-red-400' : 'bg-emerald-400') + ' rounded-md px-2'}
                        onClick={() => setShowAddPath(o => !o)}
                    >
                        {showAddPath ? 'close' : 'Add more'}
                    </button>
                </li>
            </ul>
        </li>
    )
}
