import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ShowPaths = ({ path }: { path?: string }) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 5000)
    }, [copied])

    return (
        <li className='group relative'>
            {path ? (
                <>
                    <div className='bg-blue-300 bg-opacity-30 group-hover:blur-[1px] text-blue-700 transition-all px-2 py-1 rounded-xl'>
                        {path}
                    </div>
                    <CopyToClipboard text={path} onCopy={() => setCopied(true)}>
                        <button className='absolute text-white inset-0 opacity-80 bg-blue-800 bg-opacity-60 z-10 hidden group-hover:block rounded-xl'>
                            {copied ? 'Copied!' : 'Click to copy'}
                        </button>
                    </CopyToClipboard>
                </>
            ) : (
                <div>Processing...</div>
            )}
            {/*TODO: add share and delete or edit button */}
        </li>
    )
}

export default ShowPaths
