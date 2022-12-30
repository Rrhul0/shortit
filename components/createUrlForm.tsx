import { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import { ErrorContext } from './contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from './contexts/URLsContext'

const CreateUrlForm = ({ setProcessing }: { setProcessing: Dispatch<SetStateAction<string | null>> }) => {
    const [url, setUrl] = useState('')
    const { urls, setUrls } = useContext(URLsContext)
    const { setError } = useContext(ErrorContext)

    function onSubmitURL(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let full_url = encodeURI(url)
        //check url first

        //check if it have https in front of it
        const regexp = /^http(s)?:\/\//
        if (!regexp.test(url)) full_url = 'https://' + full_url

        //add the processing entry before creating url
        setProcessing(full_url)

        //clear input
        setUrl('')

        //send data/url to create short url endpoint and receive short url it
        createURL(full_url)
            .then(url => setUrls(tUrls => [...tUrls, url])) //add url to urls context
            .catch(err => setError(err as Error))
            .finally(() => setProcessing(null))
    }

    return (
        <form onSubmit={onSubmitURL} className='flex gap-3'>
            <input
                placeholder='Your large URL'
                value={url}
                className='px-3 rounded-lg w-[25vw] outline-blue-200 outline outline-2 hover:outline-blue-400 focus-visible:outline-blue-400 hover:outline hover:outline-offset-0 hover:outline-2 focus-visible:outline focus-visible:outline-2'
                onChange={e => setUrl(e.currentTarget.value)}
            />
            <button type='submit' className='transition-all bg-stone-500 rounded-lg px-2 py-1.5 hover:bg-stone-600'>
                ShortIt
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
    const urlsLocalstorage = localStorage.getItem('urls')
    let urls: UrlWithPaths[] = []
    if (urlsLocalstorage) {
        urls = JSON.parse(urlsLocalstorage)
        if (!Array.isArray(urls)) urls = []
    }
    localStorage.setItem('urls', JSON.stringify([...urls, url]))

    return url
}
