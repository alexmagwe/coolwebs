import { Context } from './context'
export const resolvers = {
  Query: {
    websites: async (_: any, args: {}, context: Context) => {
      let data = await context.prisma.website.findMany()
      return data
    },
  },
  // Mutation:{
  //     addWebsite(website: LinkType){
  //         return website
  //     }
  // }
}
