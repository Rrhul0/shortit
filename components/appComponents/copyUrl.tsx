'use client'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function CopyUrl({ path }: { path: string }) {
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (copied) setTimeout(() => setCopied(false), 5000)
	}, [copied])

	return (
		<CopyToClipboard
			text={path}
			onCopy={() => setCopied(true)}
		>
			<button className='absolute text-white inset-0 bg-blue-800 transition-all bg-opacity-50 z-10 hidden group-hover:block rounded-xl'>
				{copied ? 'Copied!' : 'Click to copy'}
			</button>
		</CopyToClipboard>
	)
}
