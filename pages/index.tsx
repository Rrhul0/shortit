import { useContext, useEffect, useState } from 'react'
import CreateUrlForm from '../components/createUrlForm'
import ShowAllUrls from '../components/ShowAllUrls'
import { useSession, signIn, signOut } from 'next-auth/react'
import { getUrlsLocalstorage } from '../lib/urlsLocalstorage'
import { URLsContext } from '../components/contexts/URLsContext'

export default function Home() {
    const { setUrls } = useContext(URLsContext)
    const [processing, setProcessing] = useState<string | null>(null)

    useEffect(() => {
        getUrls().then(setUrls)
    }, [setUrls])

    return (
        <div className='flex flex-col items-center gap-6'>
            <h1 className='font-extrabold text-fuchsia-700 text-5xl text-center drop-shadow-lg'>
                Create and Manage Short URLs
            </h1>

            <CreateUrlForm setProcessing={setProcessing} />

            <ShowAllUrls processing={processing} />
        </div>
    )
}

async function getUrls() {
    let urls = getUrlsLocalstorage()

    const urlsRes = await fetch('/api/get-urls')
    if (urlsRes.status === 200) {
        urls = await urlsRes.json()
        localStorage.setItem('urls', JSON.stringify(urls))
    }
    //else user not logged in then localstorage is only source

    return urls
}
