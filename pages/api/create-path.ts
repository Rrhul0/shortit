import { Path } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Path>) {
    if (req.method !== 'POST') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const urlId: number = JSON.parse(req.body).urlId
    const path: string = JSON.parse(req.body).path

    const pathCreated = await prisma.path.create({
        data: {
            path,
            urlId: urlId,
        },
    })

    res.status(201).json(pathCreated)
}
