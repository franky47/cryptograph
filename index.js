const uuid = require('uuid')
const crypto = require('crypto')
const { ApolloServer, gql } = require('apollo-server-micro')
const cors = require('micro-cors')()

const typeDefs = gql`
  type HashOutput {
    hex: String
    base64: String
  }

  type Query {
    uuid: String
    sha1(data: String): HashOutput
    sha256(data: String): HashOutput
    sha512(data: String): HashOutput

    hmacSha256(key: String, data: String): HashOutput
    hmacSha512(key: String, data: String): HashOutput
  }
`

const resolveHash = (algorithm, data) => {
  const hash = crypto
    .createHash(algorithm)
    .update(data)
    .digest()
  return {
    hex: hash.toString('hex'),
    base64: hash.toString('base64')
  }
}
const resolveHmac = (algorithm, key, data) => {
  const hash = crypto
    .createHmac(algorithm, key)
    .update(data)
    .digest()
  return {
    hex: hash.toString('hex'),
    base64: hash.toString('base64')
  }
}

const resolvers = {
  Query: {
    uuid: (root, args, context) => {
      return uuid.v4()
    },
    sha1: (root, { data }) => resolveHash('sha1', data),
    sha256: (root, { data }) => resolveHash('sha256', data),
    sha512: (root, { data }) => resolveHash('sha512', data),

    hmacSha256: (root, { key, data }) => resolveHmac('sha256', key, data),
    hmacSha512: (root, { key, data }) => resolveHmac('sha512', key, data)
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})
module.exports = cors(apolloServer.createHandler())
