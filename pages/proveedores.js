// pages/proveedores.js
import { useQuery, gql } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';

// Consulta GraphQL
const GET_PROVEEDORES = gql`
  query GetProveedores {
    proveedores {
      id
      nombre
      razonSocial
      direccion
    }
  }
`;

function Proveedores() {
  // Ejecutar la consulta usando Apollo Client
  const { loading, error, data } = useQuery(GET_PROVEEDORES);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Proveedores
      </Typography>

      {/* Tabla de proveedores */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de proveedores">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Razón Social</TableCell>
              <TableCell>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.proveedores.map((proveedor) => (
              <TableRow key={proveedor.id}>
                <TableCell>{proveedor.nombre}</TableCell>
                <TableCell>{proveedor.razonSocial}</TableCell>
                <TableCell>{proveedor.direccion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Proveedores;
