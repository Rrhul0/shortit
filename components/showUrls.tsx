import { useState } from 'react'
import { urlWithPaths } from '../pages'
import AddPath from './addPath'

export default function ShowUrls({ url }: { url: urlWithPaths }) {
    const [addPath, setAddPath] = useState(false)
    const [paths, setPaths] = useState(url.paths)

    return (
        <li key={url.id}>
            <div>url: {url.to_url}</div>
            <div>
                paths:{' '}
                <a href={window.location.href + url.id} target='_blank' rel='noopener noreferrer'>
                    {window.location.href + url.id}
                </a>
                {paths.length
                    ? paths.map(path => (
                          <a
                              key={path.id}
                              href={window.location.href + path.path}
                              target='_blank'
                              rel='noopener noreferrer'
                          >
                              {window.location.href + path.path}
                          </a>
                      ))
                    : null}
                {addPath ? <AddPath url={url} setPaths={setPaths} /> : null}
                <button onClick={() => setAddPath(o => !o)}>{addPath ? 'close' : 'Add more paths'}</button>
            </div>
        </li>
    )
}
