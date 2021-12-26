import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { v1 as uuid } from 'uuid';
import { schema } from './schema.js';
import { users } from './data.js';

const PORT = process.env.PORT || 5000;

const rootValue = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === +id);
  },
  createUser: ({ input }) => {
    const user = { id: uuid(), ...input };
    users.push(user);
    return user;
  },
};

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  })
);

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
