// pages/eliminarProveedor.js
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Modal, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Definir la consulta de GraphQL para obtener los proveedores
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

// Definir la mutación de GraphQL para eliminar un proveedor
const ELIMINAR_PROVEEDOR = gql`
  mutation EliminarProveedor($id: ID!) {
    eliminarProveedor(id: $id) {
      id
      nombre
    }
  }
`;

function EliminarProveedor() {
  const { data, loading, error } = useQuery(GET_PROVEEDORES);
  const [eliminarProveedor] = useMutation(ELIMINAR_PROVEEDOR);
  const [open, setOpen] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);

  const handleOpenDialog = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setProveedorAEliminar(null);
  };

  const handleEliminar = async () => {
    try {
      await eliminarProveedor({
        variables: { id: proveedorAEliminar.id },
      });
      alert('Proveedor eliminado');
      handleCloseDialog();  // Cerrar el diálogo después de eliminar
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el proveedor');
    }
  };

  if (loading) return <p>Cargando proveedores...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Eliminar Proveedor</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Nombre</TableCell>
              <TableCell style={{ color: 'white' }}>Razón Social</TableCell>
              <TableCell style={{ color: 'white' }}>Dirección</TableCell>
              <TableCell style={{ color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.proveedores.map((proveedor) => (
              <TableRow key={proveedor.id}>
                <TableCell style={{ color: 'white' }}>{proveedor.nombre}</TableCell>
                <TableCell style={{ color: 'white' }}>{proveedor.razonSocial}</TableCell>
                <TableCell style={{ color: 'white' }}>{proveedor.direccion}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(proveedor)}
                    sx={{ color: 'red' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmación para eliminar proveedor */}
      <Modal
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{ margin: '100px auto', backgroundColor: 'white', padding: '20px', width: '400px' }}>
          <Typography
            variant="h6"
            id="modal-title"
            gutterBottom
            style={{ color: 'black' }} // Título en negro
          >
            ¿Estás seguro de que deseas eliminar este proveedor?
          </Typography>
          <Button
            onClick={handleEliminar}
            color="error"
            variant="contained"
            fullWidth
            sx={{ marginBottom: '10px' }}
          >
            Eliminar
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
            fullWidth
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default EliminarProveedor;
