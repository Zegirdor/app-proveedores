
# Proyecto de Gestión de Proveedores con GraphQL y Koa

Este es un servidor de backend para la gestión de proveedores, desarrollado con **Koa.js** y **GraphQL**. Permite crear, actualizar, eliminar y consultar proveedores. Los datos se almacenan en un archivo JSON como base de datos.

## Funcionalidades

- **Crear Proveedor**: Permite agregar un nuevo proveedor a la base de datos. La validación asegura que no se creen proveedores con nombres duplicados.
- **Actualizar Proveedor**: Permite modificar los detalles de un proveedor existente.
- **Eliminar Proveedor**: Permite eliminar un proveedor de la base de datos.
- **Consultar Proveedores**: Obtén todos los proveedores o uno específico utilizando su ID.

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/Zegirdor/app-proveedores.git
   cd app-proveedores
   ```

2. **Instalar dependencias**:

   Asegúrate de tener **Node.js** y **npm** instalados. Luego, ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
   ```

3. **Iniciar el servidor**:

   Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor:

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:4000/graphql`.

## Endpoints de GraphQL

### Consultas

- **`proveedores`**: Obtiene todos los proveedores.
  
  **Ejemplo de consulta**:
  ```graphql
  query {
    proveedores {
      id
      nombre
      razonSocial
      direccion
    }
  }
  ```

- **`proveedor(id: ID!)`**: Obtiene un proveedor por su ID.
  
  **Ejemplo de consulta**:
  ```graphql
  query {
    proveedor(id: "1") {
      id
      nombre
      razonSocial
      direccion
    }
  }
  ```

### Mutaciones

- **`crearProveedor(nombre: String!, razonSocial: String!, direccion: String!)`**: Crea un nuevo proveedor. No permite nombres duplicados.

  **Ejemplo de mutación**:
  ```graphql
  mutation {
    crearProveedor(nombre: "Proveedor A", razonSocial: "Razon A", direccion: "Dirección A") {
      id
      nombre
      razonSocial
      direccion
    }
  }
  ```

- **`actualizarProveedor(id: ID!, nombre: String, razonSocial: String, direccion: String)`**: Actualiza un proveedor existente.

  **Ejemplo de mutación**:
  ```graphql
  mutation {
    actualizarProveedor(id: "1", nombre: "Proveedor A Actualizado", razonSocial: "Razon A", direccion: "Nueva Dirección") {
      id
      nombre
      razonSocial
      direccion
    }
  }
  ```

- **`eliminarProveedor(id: ID!)`**: Elimina un proveedor por su ID.

  **Ejemplo de mutación**:
  ```graphql
  mutation {
    eliminarProveedor(id: "1") {
      id
      nombre
    }
  }
  ```

## Base de Datos

La base de datos es un archivo JSON llamado `bd.json` que se encuentra en el directorio raíz del proyecto. Aquí se almacenan los proveedores con sus respectivos detalles.

**Ejemplo de estructura de datos**:

```json
[
  {
    "id": "1",
    "nombre": "Proveedor A",
    "razonSocial": "Razon A",
    "direccion": "Dirección A"
  }
]
```

## Validaciones

- **Validación de duplicados**: El servidor valida que no se creen proveedores con el mismo nombre. Si intentas crear un proveedor con un nombre ya existente, se lanzará un error.
- **Manejo de errores**: Las operaciones de mutación lanzan errores en caso de que no se encuentren los proveedores o si se intentan realizar acciones no válidas.

## Tecnología

- **Koa.js**: Framework minimalista para Node.js.
- **GraphQL**: Lenguaje de consulta para APIs.
- **Apollo Server**: Servidor GraphQL para Koa.

## Licencia

Este proyecto está bajo la Licencia MIT.
