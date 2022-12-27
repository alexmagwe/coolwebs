import {
  objectType,
  enumType,
  extendType,
  stringArg,
  nonNull,
  queryField,
  booleanArg,
} from 'nexus'
import { Context } from '../context'
import { Website } from './Website'
export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email'), t.field('role', { type: Role })
    t.string('image')
    t.list.field('bookmarks', {
      type: Website,
      async resolve(_parent, args, ctx: Context) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .bookmarks()
      },
    })
  },
})
const Role = enumType({
  name: 'Role',
  members: ['ADMIN', 'USER'],
})

export const bookmarkWebsite = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('bookmarkWebsite', {
      type: User,
      args: {
        id: nonNull(stringArg()),
        bookmarked: nonNull(booleanArg()),
      },
      async resolve(
        _parent: any,
        args: { id: string; bookmarked: boolean },
        ctx: Context
      ) {
        if (!ctx.user) {
          throw new Error('you must be logged in to bookmark this website')
        }

        return await ctx.prisma.user.update({
          where: {
            email: ctx.user?.email,
          },
          data: {
            bookmarks: args.bookmarked
              ? { disconnect: [{ id: args.id }] }
              : { connect: [{ id: args.id }] },
          },
        })
      },
    })
  },
})
export const userQuery = queryField('user', {
  type: User,
  async resolve(_parent, _args, ctx: Context) {
    if (!ctx.user) {
      throw new Error('unauthenticated')
    }
    return await ctx.prisma.user.findUnique({
      where: {
        email: ctx.user?.email,
      },
    })
  },
})
