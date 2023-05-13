import { useContext, useEffect, useState } from 'react'
import CreateUrlForm from '../components/createUrlForm'
import ShowAllUrls from '../components/ShowAllUrls'
import { useSession, signIn, signOut } from 'next-auth/react'
import { getUrlsLocalstorage } from '../lib/urlsLocalstorage'
import { URLsContext } from '../components/contexts/URLsContext'

export default function Home() {
    const { setUrls } = useContext(URLsContext)
    const { status } = useSession()
    const [processing, setProcessing] = useState<string | null>(null)

    useEffect(() => {
        getUrls(status).then(setUrls)
    }, [setUrls, status])

    return (
        <div className='flex flex-col items-center gap-6 py-4'>
            <CreateUrlForm setProcessing={setProcessing} />

            <ShowAllUrls processing={processing} />
        </div>
    )
}

async function getUrls(status: 'authenticated' | 'loading' | 'unauthenticated') {
    let urls = getUrlsLocalstorage()

    if (status !== 'authenticated') return []

    const urlsRes = await fetch('/api/get-urls')
    if (urlsRes.status === 200) {
        urls = await urlsRes.json()
        localStorage.setItem('urls', JSON.stringify(urls))
    }
    //else user not logged in then localstorage is only source

    return urls
}
