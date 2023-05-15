import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const userId = session.user?.id

        const url = await prisma.url.findMany({
            where: { userId },
            include: { paths: {} },
        })

        res.status(200).json(url)
    } else res.status(403).send('not logged in')
}
