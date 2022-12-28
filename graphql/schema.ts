// import { gql } from "apollo-server-micro";
// import { LinkType } from "../data";
// export const typeDefs = gql`
//   type User {
//     email: String
//     role: String
//   }
//   type Website {
//     id: String
//     category: String
//     description: String
//     imageUrl: String
//     title: String
//     link: String
//     users: [String]
//   }
//   type Query {
//     websites: [Website]!
//   }
// `;
// type Mutation{
//     addWebsite(website:Website):Website
// }
import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'

export const schema = makeSchema({
  types: [types],
  shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
  outputs: {
    typegen: join(
      process.cwd(),
      'node_modules',
      '@types',
      'nexus_typegen',
      'index.d.ts'
    ),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
})
