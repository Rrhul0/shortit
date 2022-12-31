import { Path } from '@prisma/client'
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
        //can not be empty path
        if (!pathValue) return

        setProcessing(pathValue)
        setShowAddPath(false)
        createPath(pathValue, url, urlIndex)
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
        <form onSubmit={onSubmitPath} className='flex border rounded-md'>
            <input
                type='text'
                value={pathValue}
                className='rounded-l-md px-2 outline-white outline outline-2 hover:outline-blue-400 focus-visible:outline-blue-400 hover:outline hover:outline-offset-0 hover:outline-2 focus-visible:outline focus-visible:outline-2'
                onChange={e => setPathValue(e.currentTarget.value.replace(' ', '-'))}
            />
            <button type='submit' className='bg-emerald-400 outline-emerald-400 outline outline-2 px-2 rounded-r-md'>
                Add
            </button>
        </form>
    )
}

async function createPath(path: string, url: UrlWithPaths, urlIndex: number) {
    const res = await fetch('/api/create-path', {
        method: 'POST',
        body: JSON.stringify({
            urlId: url.id,
            path,
        }),
    })
    if (res.status !== 201) throw new Error('something wrong with server response')

    const createdPath: Path = await res.json()
    const paths = [...url.paths, createdPath]

    // save to localstorage
    const urlsLocalstorage = localStorage.getItem('urls')
    let urls: UrlWithPaths[] = []
    if (urlsLocalstorage) {
        urls = JSON.parse(urlsLocalstorage)
        if (!Array.isArray(urls)) urls = []
    }
    urls[urlIndex].paths = paths
    localStorage.setItem('urls', JSON.stringify(urls))

    return createdPath
}
