import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ErrorContext } from '../components/contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from '../components/contexts/URLsContext'
import Footer from '../components/Footer'
import '../styles/global.css'

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

    //remove error after 10 seconds
    useEffect(() => {
        setTimeout(() => setError(null), 10000)
    }, [error?.message])

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            <URLsContext.Provider value={{ urls, setUrls }}>
                <main className='grid grid-cols-1 grid-rows-[1fr] h-screen w-screen overflow-hidden'>
                    <div className='overflow-scroll'>
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                    {error ? (
                        <div className='absolute bottom-0 left-0 right-0 bg-red-500 py-1 px-4 text-lg'>
                            Error Occoured: {'error.message'}
                        </div>
                    ) : null}
                </main>
            </URLsContext.Provider>
        </ErrorContext.Provider>
    )
}
