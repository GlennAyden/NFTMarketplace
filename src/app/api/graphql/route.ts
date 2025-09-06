import { createSchema, createYoga } from "graphql-yoga";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const { handleRequest } = createYoga<{
  req: NextRequest;
}>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar DateTime

      enum ArtType { same unique }

      type Wallet { id: ID! address: String! createdAt: DateTime! }

      type Collection {
        id: ID!
        slug: String!
        title: String!
        symbol: String!
        description: String
        imageUrl: String
        chainId: Int!
        contract: String
        artType: ArtType!
        creator: Wallet!
        createdAt: DateTime!
      }

      type MintStage {
        id: ID!
        name: String!
        priceEth: String!
        startAt: DateTime!
        endAt: DateTime
        free: Boolean!
      }

      type Query {
        collections(take: Int = 20, skip: Int = 0): [Collection!]!
        collection(slug: String!): Collection
      }

      input CreateCollectionInput {
        slug: String!
        title: String!
        symbol: String!
        description: String
        imageUrl: String
        chainId: Int!
        artType: ArtType!
        creatorAddress: String!
      }

      type Mutation {
        createCollection(input: CreateCollectionInput!): Collection!
      }
    `,
    resolvers: {
      Query: {
        collections: async (_: any, args: { take?: number; skip?: number }) => {
          return prisma.collection.findMany({
            take: Math.min(100, Math.max(1, args.take ?? 20)),
            skip: Math.max(0, args.skip ?? 0),
            orderBy: { createdAt: "desc" },
            include: { creator: true },
          });
        },
        collection: (_: any, args: { slug: string }) =>
          prisma.collection.findUnique({ where: { slug: args.slug }, include: { creator: true } }),
      },
      Mutation: {
        createCollection: async (
          _: any,
          { input }: { input: { slug: string; title: string; symbol: string; description?: string; imageUrl?: string; chainId: number; artType: "same" | "unique"; creatorAddress: string } }
        ) => {
          const address = input.creatorAddress.toLowerCase();
          const creator = await prisma.userWallet.upsert({
            where: { address },
            update: {},
            create: { address },
          });

          const created = await prisma.collection.create({
            data: {
              slug: input.slug,
              title: input.title,
              symbol: input.symbol,
              description: input.description,
              imageUrl: input.imageUrl,
              chainId: input.chainId,
              artType: input.artType,
              creatorId: creator.id,
            },
            include: { creator: true },
          });
          return created;
        },
      },
    },
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };

