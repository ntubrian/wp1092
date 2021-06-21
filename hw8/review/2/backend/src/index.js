import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { Query, Mutation, User, ChatBox, Message } from './resolvers'
import mongo from "./mongo";
import dotenv from "dotenv-defaults";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    ChatBox,
    Message,
  },
  context: {
    db,
    pubsub,
  },
});

dotenv.config();
mongo.connect();

const port = 5000;
server.start({port: port}, () => {
  console.log(`The server is up on port ${port}!`);
});
