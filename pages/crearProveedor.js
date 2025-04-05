// pages/crearProveedor.js
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';

const CREAR_PROVEEDOR = gql`
  mutation CrearProveedor($nombre: String!, $razonSocial: String!, $direccion: String!) {
    crearProveedor(nombre: $nombre, razonSocial: $razonSocial, direccion: $direccion) {
      id
      nombre
      razonSocial
      direccion
    }
  }
`;

function CrearProveedor() {
  const [nombre, setNombre] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [crearProveedor, { loading, error }] = useMutation(CREAR_PROVEEDOR);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProveedor({ variables: { nombre, razonSocial, direccion } });
      alert('Proveedor creado');
      setNombre('');
      setRazonSocial('');
      setDireccion('');
    } catch (error) {
      console.error(error);
      alert('Error al crear el proveedor');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="textPrimary">
          Crear Proveedor
        </Typography>

        {loading && <CircularProgress />}

        {error && (
          <Typography color="error" variant="body1">
            Error al crear el proveedor: {error.message}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Razón Social"
            variant="outlined"
            fullWidth
            margin="normal"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            margin="normal"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <Button
            type="submit" variant="contained" color="primary" fullWidth
            sx={{ marginTop: 2 }}
          >
            Crear Proveedor
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default CrearProveedor;
