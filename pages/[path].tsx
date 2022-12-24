import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'

const Page = () => {
    return null
}

export default Page

export const getServerSideProps: GetServerSideProps<{}> = async ({ res, query, params }) => {
    const path = params?.path
    if (!path || Array.isArray(path)) return { props: {} }

    let fullUrl: string | undefined
    if (!isNaN(parseInt(path))) {
        //path is a url id
        const url = await prisma.url.findUnique({ where: { id: parseInt(path) } })
        fullUrl = url?.to_url
    } else {
        //path is a string from path table
        const foundPath = await prisma.path.findUnique({ where: { path }, include: { url: {} } })
        fullUrl = foundPath?.url?.to_url
    }

    if (!fullUrl)
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    return {
        redirect: {
            destination: fullUrl,
            statusCode: 307,
        },
    }
}
