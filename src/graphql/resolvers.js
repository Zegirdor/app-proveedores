// src/graphql/resolvers.js
const resolvers = {
    Query: {
      hello: () => '¡Hola mundo!',
      proveedor: (_, { id }) => {
        // Aquí, típicamente irías a una base de datos, pero por ahora lo dejamos estático.
        const proveedores = [
          { id: '1', nombre: 'Proveedor Uno', razonSocial: 'RS Proveedor Uno S.A.', direccion: 'Calle Falsa 123' },
          { id: '2', nombre: 'Proveedor Dos', razonSocial: 'RS Proveedor Dos S.A.', direccion: 'Avenida Siempre Viva 742' },
        ];
        return proveedores.find(prov => prov.id === id);
      },
      proveedores: () => [
        { id: '1', nombre: 'Proveedor Uno', razonSocial: 'RS Proveedor Uno S.A.', direccion: 'Calle Falsa 123' },
        { id: '2', nombre: 'Proveedor Dos', razonSocial: 'RS Proveedor Dos S.A.', direccion: 'Avenida Siempre Viva 742' },
      ],
    },
  };
  
  module.exports = resolvers;