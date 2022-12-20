import { URL } from '@prisma/client'
import { FormEvent, useEffect, useState } from 'react'

async function createURL(fullURL: string) {
    try {
        const res = await fetch('/api/create-url', {
            method: 'POST',
            body: JSON.stringify({
                url: fullURL,
            }),
        })
        if (res.status !== 201) return
        const url: URL = await res.json()

        //save to localstorage
        const urlsLocalstorage = localStorage.getItem('urls')
        let urls: URL[] = []
        if (urlsLocalstorage) {
            urls = JSON.parse(urlsLocalstorage)
            if (!Array.isArray(urls)) urls = []
        }
        localStorage.setItem('urls', JSON.stringify([...urls, url]))

        return url
    } catch {
        console.log('error in fetch')
    }
}

export default function Home() {
    const [url, setUrl] = useState('')
    const [processing, setProcessing] = useState<string | null>(null)
    const [urls, setUrls] = useState<URL[] | null>(null)

    useEffect(() => {
        const urlsLocalstorage = window.localStorage.getItem('urls')
        let urls: URL[] = []
        if (urlsLocalstorage) {
            urls = JSON.parse(urlsLocalstorage)
            if (!Array.isArray(urls)) urls = []
        }
        setUrls(urls)
    }, [])

    function onSubmitURL(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let full_url = encodeURI(url)
        //check url first
        //no space in full url

        //check if it have https in front of it
        const regexp = /^http(s)?:\/\//
        if (!regexp.test(url)) full_url = 'https://' + full_url

        //add the processing entry before creating url
        setProcessing(full_url)

        //send data/url to create short url endpoint and receive short url it
        createURL(full_url).then(url => {
            if (!url) return
            //clear input
            setUrl('')
            setProcessing(null)
            //fix the urls state
            setUrls(tUrls => {
                if (!tUrls) return null
                // tUrls.pop()
                return [...tUrls, url]
            })
        })
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
                <div>
                    {urls
                        ?.map(url => (
                            <li key={url.id}>
                                <div>url: {url.to_url}</div>
                                <div>
                                    paths:{' '}
                                    <a href={window.location.href + url.id} target='_blank' rel='noopener noreferrer'>
                                        {window.location.href + url.id}
                                    </a>
                                </div>
                            </li>
                        ))
                        .reverse()}
                </div>
            </main>

            <footer>
                <div>
                    Created by{' '}
                    <a href='https://github.com/rrhul0' target='_blank' rel='noopener noreferrer'>
                        Rahul Raj
                    </a>
                </div>
            </footer>
        </div>
    )
}
