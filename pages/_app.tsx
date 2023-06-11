import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ErrorContext } from '../components/contexts/ErrorContext'
import { URLsContext, UrlWithPaths } from '../components/contexts/URLsContext'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
import '../styles/global.css'
import Header from '../components/Header'

export default function App({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps) {
	const [urls, setUrls] = useState<UrlWithPaths[]>([])
	const [error, setError] = useState<Error | null>(null)

	//remove error after 10 seconds
	useEffect(() => {
		setTimeout(() => setError(null), 10000)
	}, [error?.message])

	return (
		<>
			<Head>
				<title>ShortIt: A Fully Featured URL Shortner</title>
				<meta
					name='description'
					content='A fully featured URL Shortner that can managed your shorted URL efficiently.'
				/>
				<meta
					property='og:title'
					content='ShortIt: A Fully Featured URL Shortner'
					key='title'
				/>
				<meta
					name='referrer'
					content='no-referrer'
				/>
			</Head>
			<SessionProvider session={session}>
				<ErrorContext.Provider value={{ error, setError }}>
					<URLsContext.Provider value={{ urls, setUrls }}>
						<main className='grid grid-cols-1 grid-rows-[75px_1fr] min-h-screen max-h-full w-full bg-[#28282d]'>
							<Header />
							<Component {...pageProps} />
							<Footer />
						</main>
						{error ? (
							<div className='absolute bottom-0 left-0 right-0 bg-red-500 py-1 px-4 text-lg'>
								Error Occoured: {error.message}
							</div>
						) : null}
					</URLsContext.Provider>
				</ErrorContext.Provider>
			</SessionProvider>
		</>
	)
}
