# cryptograph

GraphQL API for cryptographic functions. [https://cryptograph.now.sh/graphql/](https://cryptograph.now.sh/graphql/)

## Disclaimer

This project is intended for educational purposes on cryptography.
Do **NOT** use this in a security-conscious production project.

Especially regarding the HMAC algorithms that require sending the secret along with the data. Don't send (actual) secrets over the wire !

## How to use

Visit [`https://cryptograph.now.sh`](https://cryptograph.now.sh).
GraphQL Playground is available for you to play with the API in the browser.

## Tech

Built with [Apollo Server and micro](https://www.apollographql.com/docs/apollo-server/servers/micro.html) and deployed on [Zeit Now Serverless Docker](https://zeit.co/blog/serverless-docker).
