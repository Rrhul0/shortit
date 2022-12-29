import type { NextApiRequest, NextApiResponse } from 'next'
import { UrlWithPaths } from '../../components/contexts/URLsContext'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<UrlWithPaths>) {
    if (req.method !== 'POST') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const fullURL: string = JSON.parse(req.body).url
    const url = await prisma.url.create({
        data: {
            to_url: fullURL,
        },
        include: { paths: {} },
    })

    res.status(201).json(url)
}
