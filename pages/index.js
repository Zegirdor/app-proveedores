// pages/index.js
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from 'react';
import { Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

// Si tienes un logo local en assets, colócalo en la carpeta public y usa esta importación
// import GapsiLogo from '../public/assets/gapsi-logo.png';

// Si el logo está en una URL pública, usa esta URL directamente:
const GapsiLogo = '../icon.png';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box display="flex" alignItems="center">
            <img src={GapsiLogo} alt="Gapsi Logo" style={{ height: 40, marginRight: 16 }} />
            <Typography variant="h6" color="inherit">
              e-Commerce Gapsi
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido Principal */}
      <Container>
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h3" gutterBottom>
            Bienvenido a la Gestión de Proveedores
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link href="/proveedores" passHref>
              <Button variant="contained" color="primary">
                Ver Proveedores
              </Button>
            </Link>
            <Link href="/crearProveedor" passHref>
              <Button variant="outlined" color="secondary">
                Crear Proveedor
              </Button>
            </Link>
            <Link href="/actualizarProveedor" passHref>
              <Button variant="contained" color="info">
                Modificar Proveedor
              </Button>
            </Link>
            <Link href="/eliminarProveedor" passHref>
              <Button variant="outlined" color="error">
                Eliminar Proveedor
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
