import { objectType, nonNull, extendType, intArg, stringArg } from 'nexus'
import { Context } from '../context'
import { User } from './User'
export const Website = objectType({
  name: 'Website',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('link')
    t.string('imageUrl')
    t.string('description')
    t.string('category')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx: Context) {
        return await ctx.prisma.website
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .users()
      },
    })
  },
})
export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor')
    t.field('node', {
      type: Website,
    })
  },
})
export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor')
    t.boolean('hasNextPage')
  },
})
export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('edges', {
      type: Edge,
    })
  },
})

export const WebsiteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('websites', {
      type: 'Response',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = []

        if (args.after) {
          // check if there is a cursor as the argument
          queryResults = await ctx.prisma.website.findMany({
            take: args.first!, // the number of items to return from the database
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          })
        } else {
          // if no cursor, this means that this is the first request
          //  and we will return the first items in the database
          queryResults = await ctx.prisma.website.findMany({
            take: args.first!,
          })
        }
        // if the initial request returns links
        if (queryResults.length > 0) {
          // get last element in previous result set
          const lastLinkInResults = queryResults[queryResults.length - 1]
          // cursor we'll return in subsequent requests
          const myCursor = lastLinkInResults.id

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.website.findMany({
            take: args.first!,
            cursor: {
              id: myCursor,
            },
            // orderBy: {
            //   users: { _count: "asc" },
            // },
          })
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first!, //if the number of items requested is greater than the response of the second query, we have another page
            },
            edges: queryResults.map((website) => ({
              cursor: website.id,
              node: website,
            })),
          }

          return result
        }
        //
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        }
      },
    })
  },
})
export const WebsiteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createWebsite', {
      type: Website,
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        link: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        category: stringArg(),
      },
      async resolve(
        _parent,
        args: {
          title: string
          description: string
          link: string
          imageUrl: string
          category?: string | null | undefined
        },
        ctx: Context
      ) {
        if (!ctx.user)
          throw new Error('you need to be logged in to perform this action')
        const newWeb = {
          title: args.title,
          description: args.description,
          link: args.link,
          imageUrl: args.imageUrl,
          category: args.category,
        }
        return await ctx.prisma.website.create({
          data: newWeb,
        })
      },
    })
  },
})
