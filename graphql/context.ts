import prisma from '../lib/prisma'
import { PrismaClient } from '@prisma/client'
import { Claims, getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export type Context = {
  prisma: PrismaClient
  user?: Claims
  accessToken?: string
}
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<Context> {
  const session = getSession(req, res)
  if (!session) {
    return { prisma }
  }
  const { user, accessToken } = session
  return {
    user,
    accessToken,
    prisma,
  }
}
