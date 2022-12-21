import { path, URL } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { UrlWithPaths } from './contexts/URLsContext'

export default function AddPath({
    url,
    setPaths,
    setShowAddPath,
    setProcessing,
}: {
    url: URL
    setPaths: Dispatch<SetStateAction<path[]>>
    setShowAddPath: Dispatch<SetStateAction<boolean>>
    setProcessing: Dispatch<SetStateAction<string | null>>
}) {
    const [path, setPath] = useState('')

    function onSubmitPath(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setProcessing(path)
        setShowAddPath(false)
        createPath(path, url)
            .then(cPath => {
                setPaths(p => [...p, cPath])
                setPath('')
            })
            .catch()
            .finally(() => {
                setProcessing(null)
            })
    }

    return (
        <form onSubmit={onSubmitPath}>
            <input type='text' value={path} onChange={e => setPath(e.currentTarget.value)} />
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

    //save to localstorage
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
