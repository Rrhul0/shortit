import { path, URL } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import { ErrorContext } from './contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from './contexts/URLsContext'

export default function AddPath({
    urlIndex,
    setShowAddPath,
    setProcessing,
}: {
    urlIndex: number
    setShowAddPath: Dispatch<SetStateAction<boolean>>
    setProcessing: Dispatch<SetStateAction<string | null>>
}) {
    const [pathValue, setPathValue] = useState('')
    const { urls, setUrls } = useContext(URLsContext)
    const url = urls[urlIndex]

    const { setError } = useContext(ErrorContext)

    function onSubmitPath(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setProcessing(pathValue)
        setShowAddPath(false)
        createPath(pathValue, url)
            .then(path => {
                //set paths to selected url
                setUrls(turls => {
                    turls[urlIndex].paths = [...turls[urlIndex].paths, path]
                    return [...turls]
                })
            })
            .catch(err => setError(err as Error))
            .finally(() => {
                setProcessing(null)
                setPathValue('')
            })
    }

    return (
        <form onSubmit={onSubmitPath}>
            <input type='text' value={pathValue} onChange={e => setPathValue(e.currentTarget.value)} />
            <button type='submit'>Add</button>
        </form>
    )
}

async function createPath(path: string, url: URL) {
    const res = await fetch('/api/create-path', {
        method: 'POST',
        body: JSON.stringify({
            urlId: url.id,
            path,
        }),
    })
    if (res.status !== 201) throw new Error('something wrong with server response')

    const createdPath: path = await res.json()

    // save to localstorage
    const urlsLocalstorage = localStorage.getItem('urls')
    let urls: UrlWithPaths[] = []
    if (urlsLocalstorage) {
        urls = JSON.parse(urlsLocalstorage)
        if (!Array.isArray(urls)) urls = []
    }
    urls.map(u => {
        if (url.id !== u.id) return u
        u.paths = [...u.paths, createdPath]
        return u
    })
    localStorage.setItem('urls', JSON.stringify(urls))

    return createdPath
}
