import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { URLsContext, UrlWithPaths } from '../components/contexts/URLsContext'

export default function App({ Component, pageProps }: AppProps) {
    const [urls, setUrls] = useState<UrlWithPaths[]>([])

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
        <URLsContext.Provider value={{ urls, setUrls }}>
            <Component {...pageProps} />
        </URLsContext.Provider>
    )
}
