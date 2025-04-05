// src/graphql/typeDefs.js
const { gql } = require('apollo-server-koa');

const typeDefs = gql`
  type Query {
    hello: String
    proveedor(id: ID!): Proveedor
    proveedores: [Proveedor]
  }

  type Proveedor {
    id: ID!
    nombre: String!
    razonSocial: String!
    direccion: String!
  }
`;

module.exports = typeDefs;