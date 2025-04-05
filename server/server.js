// server.js
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const { ApolloServer, gql } = require('apollo-server-koa');
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const dbPath = path.join(__dirname, '../bd.json');

// Función para leer la base de datos (bd.json)
const readDatabase = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Función para guardar cambios en la base de datos (bd.json)
const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

const typeDefs = gql`
  type Query {
    hello: String
    proveedor(id: ID!): Proveedor
    proveedores: [Proveedor]
  }

  type Mutation {
    crearProveedor(nombre: String!, razonSocial: String!, direccion: String!): Proveedor
    actualizarProveedor(id: ID!, nombre: String, razonSocial: String, direccion: String): Proveedor
    eliminarProveedor(id: ID!): Proveedor
  }

  type Proveedor {
    id: ID!
    nombre: String!
    razonSocial: String!
    direccion: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => '¡Hola desde GraphQL con Koa!',
    proveedores: () => readDatabase(),
    proveedor: (_, { id }) => {
      const proveedores = readDatabase();
      return proveedores.find(prov => prov.id === id);
    },
  },
  Mutation: {
    crearProveedor: (_, { nombre, razonSocial, direccion }) => {
      const proveedores = readDatabase();

      // Verificar si ya existe un proveedor con el mismo nombre
      const proveedorExistente = proveedores.find(prov => prov.nombre.toLowerCase() == nombre.toLowerCase());
      if (proveedorExistente) {
        throw new Error(`El proveedor con el nombre "${nombre}" ya existe.`);
      }

      // Crear un nuevo proveedor si no hay duplicados
      const newProveedor = {
        id: String(proveedores.length + 1),
        nombre,
        razonSocial,
        direccion,
      };

      proveedores.push(newProveedor);
      writeDatabase(proveedores);
      return newProveedor;
    },
    actualizarProveedor: (_, { id, nombre, razonSocial, direccion }) => {
      const proveedores = readDatabase();
      const proveedorIndex = proveedores.findIndex(prov => prov.id === id);
      if (proveedorIndex === -1) throw new Error("Proveedor no encontrado");
      const updatedProveedor = { ...proveedores[proveedorIndex], nombre, razonSocial, direccion };
      proveedores[proveedorIndex] = updatedProveedor;
      writeDatabase(proveedores);
      return updatedProveedor;
    },
    eliminarProveedor: (_, { id }) => {
      const proveedores = readDatabase();
      const proveedorIndex = proveedores.findIndex(prov => prov.id === id);
      if (proveedorIndex === -1) throw new Error("Proveedor no encontrado");
      const deletedProveedor = proveedores.splice(proveedorIndex, 1)[0];
      writeDatabase(proveedores);
      return deletedProveedor;
    },
  },
};

async function startServer() {
  const app = new Koa();
  const router = new Router();

  app.use(cors());

  // Inicializando Apollo Server con los typeDefs y resolvers
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Ruta adicional de Koa
  router.get('/', (ctx) => {
    ctx.body = 'Servidor Koa corriendo';
  });

  app.use(router.routes()).use(router.allowedMethods());

  // Iniciando servidor en el puerto 4000
  app.listen(4000, () => {
    console.log('🚀 Servidor Koa con GraphQL en http://localhost:4000/graphql');
  });
}

startServer();
