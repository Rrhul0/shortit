import { useState } from 'react'
import { urlWithPaths } from '../pages'
import AddPath from './addPath'

export default function ShowUrls({ url }: { url: urlWithPaths }) {
    const [showAddPath, setShowAddPath] = useState(false)
    const [processing, setProcessing] = useState<string | null>(null)
    const [paths, setPaths] = useState(url.paths)

    return (
        <li key={url.id}>
            <div>url: {url.to_url}</div>
            <div>
                paths:{' '}
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
                    <AddPath
                        url={url}
                        setPaths={setPaths}
                        setShowAddPath={setShowAddPath}
                        setProcessing={setProcessing}
                    />
                ) : null}
                <button onClick={() => setShowAddPath(o => !o)}>{showAddPath ? 'close' : 'Add more paths'}</button>
            </div>
        </li>
    )
}
