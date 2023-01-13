import { Session } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UrlWithPaths } from '../../components/contexts/URLsContext'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<UrlWithPaths>) {
    if (req.method !== 'POST') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const sessionToken = req.cookies['next-auth.session-token']

    const to_url: string = JSON.parse(req.body).url

    //getuserId
    let session: Session | null
    if (!sessionToken) session = null
    else
        session = await prisma.session.findUnique({
            where: { sessionToken },
            include: { user: {} },
        })
    const userId = session?.userId

    const url = await prisma.url.create({
        data: { to_url, userId },
        include: { paths: {} },
    })

    res.status(201).json(url)
}
