import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ErrorContext } from '../components/contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from '../components/contexts/URLsContext'

export default function App({ Component, pageProps }: AppProps) {
    const [urls, setUrls] = useState<UrlWithPaths[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const urlsLocalstorage = window.localStorage.getItem('urls')
        let urls: UrlWithPaths[] = []
        if (urlsLocalstorage) {
            urls = JSON.parse(urlsLocalstorage)
            if (!Array.isArray(urls)) urls = []
        }
        setUrls(urls)
    }, [])

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            <URLsContext.Provider value={{ urls, setUrls }}>
                <>
                    <Component {...pageProps} />
                    <footer>
                        {error ? <div>Error Occoured: {error.message}</div> : null}
                        <div>
                            Created by{' '}
                            <a href='https://github.com/rrhul0' target='_blank' rel='noopener noreferrer'>
                                Rahul Raj
                            </a>
                        </div>
                    </footer>
                </>
            </URLsContext.Provider>
        </ErrorContext.Provider>
    )
}
