import { Path } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Dispatch, FormEvent, RefObject, SetStateAction, useContext, useState } from 'react'
import { getUrlsLocalstorage } from '../lib/urlsLocalstorage'
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

    const { status } = useSession()
    const { setError } = useContext(ErrorContext)

    const url = urls[urlIndex]

    function onSubmitPath(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        //can not be empty path
        if (!pathValue) return

        setProcessing(pathValue)
        setShowAddPath(false)
        createPath(pathValue, url, urlIndex, status)
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
        <form onSubmit={onSubmitPath} className='flex rounded-md '>
            <input
                autoFocus
                type='text'
                value={pathValue}
                className='rounded-l-md px-2 border-y border-l border-stone-100 bg-stone-100 drop-shadow-lg hover:border-blue-400  focus:border-blue-600 focus:outline-none'
                onChange={e => setPathValue(e.currentTarget.value.replace(' ', '-'))}
            />
            <button
                type='submit'
                className='bg-emerald-500 px-2 rounded-r-md drop-shadow-lg text-white hover:bg-emerald-600 transition-all'
            >
                Add
            </button>
        </form>
    )
}

async function createPath(
    path: string,
    url: UrlWithPaths,
    urlIndex: number,
    loginStatus: 'authenticated' | 'loading' | 'unauthenticated'
) {
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

    // save to localstorage only if user is not logged in
    if (loginStatus === 'unauthenticated') {
        const urls = getUrlsLocalstorage()
        urls[urlIndex].paths = paths
        localStorage.setItem('urls', JSON.stringify(urls))
    }

    return createdPath
}
