import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end(req.method + ' method is not allowed')
        return
    }

    const urlId: number = JSON.parse(req.body).urlId
    const path: string = JSON.parse(req.body).path

    const pathCreated = await prisma.path.create({
        data: {
            path,
            uRLId: urlId,
        },
    })

    const test = await prisma.uRL.findUnique({ where: { id: urlId }, include: { paths: {} } })

    res.status(201).json(pathCreated)
}
