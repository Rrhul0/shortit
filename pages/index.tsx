import { useState } from 'react'
import CreateUrlForm from '../components/createUrlForm'
import ShowAllUrls from '../components/ShowAllUrls'

export default function Home() {
    const [processing, setProcessing] = useState<string | null>(null)

    return (
        <div className='flex flex-col items-center gap-6'>
            <h1 className='font-extrabold text-5xl mt-12'>Welcome to ShortIt</h1>

            <CreateUrlForm setProcessing={setProcessing} />

            <ShowAllUrls processing={processing} />
        </div>
    )
}
