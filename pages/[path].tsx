import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'
import { useEffect, useRef, useState } from 'react'
import prisma from '../lib/prisma'

export default function Page({ url }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [sec, setSec] = useState(5)
    const link = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        const interval = setInterval(
            () =>
                setSec(s => {
                    if (s !== 0) return s - 1
                    clearInterval(interval)
                    return 0
                }),
            1000
        )
    }, [])

    useEffect(() => {
        if (sec === 0) link.current?.click()
    }, [sec])

    if (!url) return <div>Url not found!</div>

    return (
        <>
            <a href={url} ref={link}>
                {url}
            </a>
            <div>Redirecting {sec ? `in ${sec} seconds` : '...'}</div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<{ url?: string }> = async context => {
    const id = context.params?.path
    if (!id || Array.isArray(id)) return { props: {} }
    const url = await prisma.uRL.findUnique({ where: { id: parseInt(id) } })
    if (!url) return { props: {} }
    return {
        props: {
            url: url.to_url,
        },
    }
}
