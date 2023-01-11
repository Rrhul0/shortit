import { useState } from 'react'
import CreateUrlForm from '../components/createUrlForm'
import ShowAllUrls from '../components/ShowAllUrls'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
    const [processing, setProcessing] = useState<string | null>(null)

    const { data, status } = useSession()

    return (
        <div className='flex flex-col items-center gap-6'>
            <h1 className='font-extrabold text-fuchsia-700 text-5xl mt-12 text-center drop-shadow-lg'>
                Create and Manage Short URLs
            </h1>

            {status === 'unauthenticated' ? (
                <button onClick={() => signIn()}>login</button>
            ) : (
                <button onClick={() => signOut()}>logout</button>
            )}

            <CreateUrlForm setProcessing={setProcessing} />

            <ShowAllUrls processing={processing} />
        </div>
    )
}
