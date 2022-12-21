import { FormEvent, useContext, useState } from 'react'
import { ErrorContext } from '../components/contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from '../components/contexts/URLsContext'
import ShowUrls from '../components/showUrls'

export default function Home() {
    const [url, setUrl] = useState('')
    const [processing, setProcessing] = useState<string | null>(null)
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
        <div>
            <main>
                <h1>Welcome to ShortIt</h1>

                <form onSubmit={onSubmitURL}>
                    <input
                        placeholder='Type OR Paste your large URL'
                        value={url}
                        onChange={e => setUrl(e.currentTarget.value)}
                    />
                    <button type='submit'>ShortIt</button>
                </form>
                {processing ? (
                    <div>
                        <div>url: {processing}</div>
                        <div>Processing...</div>
                    </div>
                ) : null}
                <ol>
                    {urls?.reverse().map((url, index) => (
                        <ShowUrls key={url.id} urlIndex={index} />
                    ))}
                </ol>
            </main>
        </div>
    )
}

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
