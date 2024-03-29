import { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import { setUrlsLocalstorage } from '../lib/urlsLocalstorage'
import { ErrorContext } from './contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from './contexts/URLsContext'

const CreateUrlForm = ({ setProcessing }: { setProcessing: Dispatch<SetStateAction<string | null>> }) => {
    const [url, setUrl] = useState('')
    const { setUrls } = useContext(URLsContext)
    const { setError } = useContext(ErrorContext)

    function onSubmitURL(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!url) return
        let full_url = encodeURI(url)
        //check url first

        //check if it have https in front of it
        const regexp = /^http(s)?:\/\//
        if (!regexp.test(url)) full_url = 'https://' + full_url

        //add the processing entry before creating url
        setProcessing(full_url)
        setUrl('')

        //send data/url to create short url endpoint and receive short url it
        createURL(full_url)
            .then(url => setUrls(tUrls => [...tUrls, url])) //add url to urls context
            .catch(err => setError(err as Error))
            .finally(() => setProcessing(null))
    }

    return (
        <form onSubmit={onSubmitURL} className='flex gap-3 w-full text-lg justify-center'>
            <input
                placeholder='Your large URL'
                value={url}
                className='px-3 rounded-lg w-3/5 sm:w-2/5 md:w-1/2 lg:w-2/5 drop-shadow-lg bg-stone-100 border-2 border-stone-100 focus:border-violet-600 transition-colors hover:border-violet-400 focus:outline-none focus:bg-white'
                onChange={e => setUrl(e.currentTarget.value)}
            />
            <button
                type='submit'
                className='transition-all text-white tracking-wider drop-shadow-lg bg-violet-500 rounded-lg px-3 py-2 hover:bg-violet-600 active:shadow-inner'>
                Short It
            </button>
        </form>
    )
}

export default CreateUrlForm

async function createURL(fullURL: string) {
    const res = await fetch('/api/create-url', {
        method: 'POST',
        body: JSON.stringify({
            url: fullURL,
        }),
    })
    if (res.status !== 201) throw new Error('something wrong with server response')

    const url: UrlWithPaths = await res.json()

    //save to localstorage
    setUrlsLocalstorage(url)

    return url
}
