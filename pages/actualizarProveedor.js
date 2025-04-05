import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Modal, TextField, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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

// Definir la mutación de GraphQL para actualizar un proveedor
const ACTUALIZAR_PROVEEDOR = gql`
  mutation ActualizarProveedor($id: ID!, $nombre: String, $razonSocial: String, $direccion: String) {
    actualizarProveedor(id: $id, nombre: $nombre, razonSocial: $razonSocial, direccion: $direccion) {
      id
      nombre
      razonSocial
      direccion
    }
  }
`;

function ActualizarProveedor() {
  const { data, loading, error } = useQuery(GET_PROVEEDORES);
  const [actualizarProveedor] = useMutation(ACTUALIZAR_PROVEEDOR);
  const [open, setOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [nombre, setNombre] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleOpen = (proveedor) => {
    setSelectedProveedor(proveedor);
    setNombre(proveedor.nombre);
    setRazonSocial(proveedor.razonSocial);
    setDireccion(proveedor.direccion);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProveedor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarProveedor({
        variables: { id: selectedProveedor.id, nombre, razonSocial, direccion },
      });
      alert('Proveedor actualizado');
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el proveedor');
    }
  };

  if (loading) return <p>Cargando proveedores...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 style={{ color: 'white' }}>Modificar Proveedor</h1>
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
                  <IconButton onClick={() => handleOpen(proveedor)}>
                    <EditIcon sx={{ color: 'white' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para editar proveedor */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{ margin: '50px auto', backgroundColor: 'white', padding: '20px', width: '400px' }}>
          <Typography variant="h6" id="modal-title" gutterBottom sx={{ color: 'black' }}>
            Editar Proveedor
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Razón Social"
              variant="outlined"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              margin="normal"
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Actualizar Proveedor
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ActualizarProveedor;
