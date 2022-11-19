import { FormEvent, useState } from 'react'

async function createURL(fullURL: string) {
    try {
        const res = await fetch('/api/create-url', {
            method: 'POST',
            body: JSON.stringify({
                url: fullURL,
            }),
        })
    } catch {
        console.log('error in fetch')
    }
}

export default function Home() {
    const [url, setUrl] = useState('')

    function onSubmitURL(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let full_url = url
        //check url first
        //check if it have https in front of it
        const regexp = /^http(s)?:\/\//
        if (!regexp.test(url)) full_url = 'https://' + full_url
        //send data/url to create short url endpoint and receive short url it
        createURL(full_url).then(() => setUrl(''))
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
