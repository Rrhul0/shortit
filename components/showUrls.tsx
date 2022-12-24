import { useContext, useState } from 'react'
import AddPath from './addPath'
import { URLsContext } from './contexts/URLsContext'

export default function ShowUrls({ urlIndex }: { urlIndex: number }) {
    const [showAddPath, setShowAddPath] = useState(false)
    const [processing, setProcessing] = useState<string | null>(null)

    const { urls } = useContext(URLsContext)
    const url = urls[urlIndex]
    const paths = url.paths

    return (
        <li key={url.id} className='border rounded-lg px-3 py-2 bg-stone-200'>
            <div>
                Full URL: <a href={url.to_url}>{url.to_url}</a>
            </div>
            <div>
                Short URLs:{' '}
                <ul>
                    <li>
                        <a href={window.location.href + url.id} target='_blank' rel='noopener noreferrer'>
                            {window.location.href + url.id}
                        </a>
                    </li>
                    {paths.length
                        ? paths.map(path => (
                              <li key={path.id}>
                                  <a href={window.location.href + path.path} target='_blank' rel='noopener noreferrer'>
                                      {window.location.href + path.path}
                                  </a>
                              </li>
                          ))
                        : null}
                    {processing ? (
                        <li>
                            <a href={window.location.href + processing} target='_blank' rel='noopener noreferrer'>
                                {window.location.href + processing}
                            </a>
                        </li>
                    ) : null}
                </ul>
                {showAddPath ? (
                    <AddPath urlIndex={urlIndex} setShowAddPath={setShowAddPath} setProcessing={setProcessing} />
                ) : null}
                <button onClick={() => setShowAddPath(o => !o)}>{showAddPath ? 'close' : 'Add more paths'}</button>
            </div>
        </li>
    )
}
