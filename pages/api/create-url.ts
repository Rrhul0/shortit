import { Session } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UrlWithPaths } from '../../components/contexts/URLsContext'
import prisma from '../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse<UrlWithPaths>) {
    if (req.method !== 'POST') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const to_url = JSON.parse(req.body).url
    if (!to_url || typeof to_url !== 'string') {
        res.status(400).end('url not found in body to shorten it')
        return
    }

    const session = await getServerSession(req, res, authOptions)
    const userId = session?.user?.id

    //if user id not found means user is not logged in
    //then create an anonymous short url

    const url = await prisma.url.create({
        data: { to_url, userId },
        include: { paths: {} },
    })

    res.status(201).json(url)
}
