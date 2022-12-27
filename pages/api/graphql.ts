import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import { schema } from '@graphql/schema'
import { ApolloServer } from '@apollo/server'
import prisma from '@lib/prisma'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import NextCors from 'nextjs-cors'
import { getSession } from '@auth0/nextjs-auth0'

const server = new ApolloServer({ schema, introspection: true })

// context: createContext,

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }
const startServer = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
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
  },
})
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  await startServer(req, res)
}
