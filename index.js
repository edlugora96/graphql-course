const { graphql, buildSchema } = require("graphql")
const express = require("express")
const gqlMiddleware = require("express-graphql")
const { readFileSync } = require("fs")
const { join } = require("path")
const resolvers = require("./lib/resolver")

const app = express()
const port = process.env.PORT || 3000

const schema = buildSchema(
  readFileSync(join(__dirname, "lib", "schema.graphql"), "utf-8"),
)

// console.log(gqlMiddleware.graphqlHTTP)

app.use(
  "/api",
  gqlMiddleware.graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
)

app.listen(port, () =>
  console.log(`Server ready on http://localhost:${port}/api`),
)
