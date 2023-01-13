import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const sessionToken = req.cookies['next-auth.session-token']

    // const to_url: string = JSON.parse(req.body).url

    //getuserId
    // let session: Session | null
    if (!sessionToken) {
        res.status(403).send('not logged in')
        return
    }
    // else
    const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: {} },
    })
    if (!session) {
        res.status(403).send('not logged in')
        return
    }
    const userId = session.userId

    const url = await prisma.url.findMany({
        where: { userId },
        include: { paths: {} },
    })

    res.status(201).json(url)
}
